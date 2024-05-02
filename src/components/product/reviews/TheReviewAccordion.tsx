"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReviewProps, fetchReviewStats, fetchReviews } from "@/axios/review-req";
import TheReviewForm from "./TheReviewForm";

export default function ReviewAccordion({
  itemHandle,
}: {
  itemHandle: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewsPerPage] = useState(5);

  const { data: reviewData } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(itemHandle),
  });

  const { data: filteredReviewsStats } = useQuery({
    queryKey: ["reviews-stats"],
    queryFn: () => fetchReviewStats(itemHandle),
  });
  console.log("reviewData", reviewData)

  useEffect(() => {
    if (filteredReviewsStats?.length > 0) {
      const stats = filteredReviewsStats[0]?.stats;
      setTotalReviews(stats?.totalReviews);
    }
  }, [filteredReviewsStats]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const loadMoreReviewsHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const loadPreviousReviewsHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const currentReviews = reviewData?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const renderedReviews =
    reviewData && reviewData?.length > 0 ? (
      currentReviews?.map((review: ReviewProps) => (
        <div key={review.id} className="flex flex-col mb-5 border-b py-4">
          <div className="flex gap-3">
            <div className="flex items-center justify-center uppercase rounded-[50%] bg-[#e0e0e0] w-12 h-12 ">
              {review?.author?.charAt(0)}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  style={{ color: "rgb(14, 14, 14)" }}
                />
                <p className="text-sm font-light">{review.createdAt}</p>
              </div>
              <div className="flex">
                {review?.isVerified ? (
                  <p className="flex items-center bg-black text-white text-xs tracking-wider mr-3 px-3">
                    Verified
                  </p>
                ) : (
                  ""
                )}
                <p className="font-bold">{review.author}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-1 mt-2">
            <p className="font-bold">{review.title}</p>
            <p className="text-sm">{review.review}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No reviews available for this product.</p>
    );

  return (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="Reviews">
        <AccordionTrigger className="uppercase text-sm tracking-widest leading-6 font-light">
          Reviews ({totalReviews})
        </AccordionTrigger>
        <AccordionContent className="whitespace-break-spaces">
          <div className="pb-10">
            <TheReviewForm productHandle={itemHandle} />
          </div>
          {renderedReviews}
          <div className="flex gap-3">
            {currentPage > 1 && (
              <Button onClick={loadPreviousReviewsHandler}>
                Load previous reviews
              </Button>
            )}
            {reviewData && reviewData?.length > indexOfLastReview && (
              <Button onClick={loadMoreReviewsHandler}>
                Load more reviews
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
