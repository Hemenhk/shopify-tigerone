import { getAdminValues, updateAdminValues } from "@/axios/adminValue-req";
import {
  fetchAllReviews,
  fetchReviewStats,
  fetchReviews,
} from "@/axios/review-req";
import { getPages } from "@/graphql/queries/page-query";
import { getShopInfo } from "@/graphql/queries/shop-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AdminValues = {
  announcementText?: string;
  announcementColor?: string;
  heroHeading?: string;
  heroSubHeading?: string;
  heroButtonText?: string;
  heroButtonColor?: string;
  footerBackgroundColor?: string;
  email?: string;
  address?: string;
  featuredCollection?: string;
};

export const useAdminValues = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["adminValues"],
    queryFn: getAdminValues,
  });

  return { data, isError, isLoading };
};

export const useAdminValueMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["adminValues"],
    mutationFn: async (data: AdminValues) => updateAdminValues(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["adminValues"], data);
      queryClient.invalidateQueries({ queryKey: ["adminValues"] });
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  return { mutateAsync, isError, isPending, isSuccess };
};

export const useShopQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["shop"],
    queryFn: getShopInfo,
  });

  return { data, isError, isLoading };
};

export const usePagesQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  return { data, isError, isLoading };
};

export const useReviewStatsQuery = (productHandle: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["review-stats"],
    queryFn: () => fetchReviewStats(productHandle),
  });
  return { data, isError, isLoading };
};

export const useReviewQuery = (productHandle: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(productHandle),
  });

  return { data, isError, isLoading };
};

export const useAllReviewsQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchAllReviews,
  });

  return { data, isError, isLoading };
};

export const useContactMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["contact"],
    mutationFn: async (data) => updateAdminValues(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["adminValues"], data);
      queryClient.refetchQueries({ queryKey: ["adminValues"] });
    },
  });

  return { mutateAsync, isError, isPending, isSuccess };
};
