import mongoose, { Document, Model } from "mongoose";

export interface ReviewDocument extends Document {
  productHandle: string;
  isVerified: boolean;
  review: string;
  rating: number;
}

interface ItemReviewModel extends Model<ReviewDocument> {
  calculateReviewStats(productHandle: string): Promise<any>;
}

const reviewSchema = new mongoose.Schema(
  {
    productHandle: {
      type: String,
      required: [true, "Must have a product handle"],
    },
    title: {
      type: String,
      required: [true, "A title can not be empty"],
      trim: true,
      maxLength: [100, "A title must have less than 500 characters"],
      minLength: [1, "A title must have at least 1 character"],
    },
    review: {
      type: String,
      required: [true, "A review can not be empty"],
      trim: true,
      maxLength: [500, "A review must have less than 500 characters"],
      minLength: [1, "A review must have at least 1 character"],
    },
    rating: {
      type: Number,
      required: [true, "A review must have a rating"],
      min: 1,
      max: 5,
    },
    author: {
      type: String,
      required: [true, "A review must have an author"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        const date = ret.createdAt;
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        ret.createdAt = `${day}/${month}/${year}`;
      },
    },
    toObject: { virtuals: true },
  }
);

reviewSchema.statics.calculateReviewStats = async function (
  productHandle: string
) {
  const stats = await this.aggregate([
    {
      $match: { productHandle: productHandle },
    },
    {
      $group: {
        _id: "$productHandle",
        totalReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    return stats[0];
  } else {
    return {
      totalReviews: 0,
      averageRating: 0,
    };
  }
};
const ItemReviews: ItemReviewModel = (mongoose.models.ItemReviews ||
  mongoose.model<ReviewDocument>(
    "ItemReviews",
    reviewSchema
  )) as ItemReviewModel;

export default ItemReviews;
