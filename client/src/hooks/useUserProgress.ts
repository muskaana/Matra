import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type {
  UserProfile,
  InsertUserProfile,
  UpdateUserProfile,
  Progress,
  InsertProgress,
  UpdateProgress,
  WordProgress,
  InsertWordProgress,
  UpdateWordProgress,
  SentenceProgress,
  InsertSentenceProgress,
  UpdateSentenceProgress,
  ReadingProgress,
  InsertReadingProgress,
  UpdateReadingProgress,
  ReviewItem,
  InsertReviewItem,
  UpdateReviewItem,
  Achievement,
  InsertAchievement
} from "@shared/schema";

// User Profile Hooks
export function useUserProfile() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/profile", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertUserProfile) => {
      return apiRequest("POST", `/api/profile/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateUserProfile) => {
      return apiRequest("PATCH", `/api/profile/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile", userId] });
    },
  });

  return {
    profile: query.data as UserProfile | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createProfile: createMutation.mutateAsync,
    updateProfile: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Progress Hooks (lesson/quiz completion)
export function useProgress() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/progress", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProgress) => {
      return apiRequest("POST", `/api/progress/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { progressId: number; data: UpdateProgress }) => {
      return apiRequest("PATCH", `/api/progress/${params.progressId}`, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress", userId] });
    },
  });

  return {
    progress: query.data as Progress[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createProgress: createMutation.mutateAsync,
    updateProgress: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Word Progress Hooks
export function useWordProgress() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/words/progress", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertWordProgress) => {
      return apiRequest("POST", `/api/words/progress/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/words/progress", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { progressId: number; data: UpdateWordProgress }) => {
      return apiRequest("PATCH", `/api/words/progress/${params.progressId}`, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/words/progress", userId] });
    },
  });

  return {
    wordProgress: query.data as WordProgress[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createWordProgress: createMutation.mutateAsync,
    updateWordProgress: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Sentence Progress Hooks
export function useSentenceProgress() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/sentences/progress", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertSentenceProgress) => {
      return apiRequest("POST", `/api/sentences/progress/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sentences/progress", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { progressId: number; data: UpdateSentenceProgress }) => {
      return apiRequest("PATCH", `/api/sentences/progress/${params.progressId}`, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sentences/progress", userId] });
    },
  });

  return {
    sentenceProgress: query.data as SentenceProgress[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createSentenceProgress: createMutation.mutateAsync,
    updateSentenceProgress: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Reading Progress Hooks
export function useReadingProgress() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/reading/progress", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertReadingProgress) => {
      return apiRequest("POST", `/api/reading/progress/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reading/progress", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { progressId: number; data: UpdateReadingProgress }) => {
      return apiRequest("PATCH", `/api/reading/progress/${params.progressId}`, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reading/progress", userId] });
    },
  });

  return {
    readingProgress: query.data as ReadingProgress[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createReadingProgress: createMutation.mutateAsync,
    updateReadingProgress: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Review Items Hooks
export function useReviewItems() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/review", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertReviewItem) => {
      return apiRequest("POST", `/api/review/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/review", userId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { reviewId: number; data: UpdateReviewItem }) => {
      return apiRequest("PATCH", `/api/review/${params.reviewId}`, params.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/review", userId] });
    },
  });

  return {
    reviewItems: query.data as ReviewItem[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    createReviewItem: createMutation.mutateAsync,
    updateReviewItem: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

// Achievements Hooks
export function useAchievements() {
  const { user } = useAuth();
  const userId = (user as any)?.claims?.sub;

  const query = useQuery({
    queryKey: ["/api/achievements", userId],
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertAchievement) => {
      return apiRequest("POST", `/api/achievements/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements", userId] });
    },
  });

  return {
    achievements: query.data as Achievement[] | undefined,
    isLoading: query.isLoading,
    error: query.error,
    unlockAchievement: createMutation.mutateAsync,
    isUnlocking: createMutation.isPending,
  };
}
