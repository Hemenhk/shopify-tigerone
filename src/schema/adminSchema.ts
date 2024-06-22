import mongoose, { Document, Model } from "mongoose";

export interface AdminValuesDocument extends Document {
  announcementText: string;
  announcementColor: string;
  heroHeading: string;
  heroSubHeading: string;
  heroButtonText: string;
  heroButtonColor: string;
  footerBackgroundColor: string;
  email: string;
  address: string;
  featuredCollection: string;
  _id?: string;
}

const adminValues = new mongoose.Schema({
  announcementText: {
    type: String,
    required: [true, "A store must have an announcement text"],
  },
  announcementColor: {
    type: String,
    required: [true, "A store must have an announcement color"],
  },
  heroHeading: {
    type: String,
    required: [true, "A store must have a hero heading"],
  },
  heroSubHeading: {
    type: String,
    required: [true, "A store must have a hero sub-heading"],
  },
  heroButtonText: {
    type: String,
  },
  heroButtonColor: {
    type: String,
  },
  footerBackgroundColor: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Must have an email"],
  },
  address: {
    type: String,
    required: [true, "Must have an address"],
  },
  featuredCollection: {
    type: String,
  },
  productId: {},
});

const AdminValues: Model<AdminValuesDocument> =
  mongoose.models.AdminValues ||
  mongoose.model<AdminValuesDocument>("AdminValues", adminValues);

export default AdminValues;
