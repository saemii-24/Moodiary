import { useMutation } from "@tanstack/react-query";

export interface CreatePostPayload {
  userId: string;
  date: string | Date;
  feeling: string;
  title: string;
  content: string;
}

export interface PopulatedUser {
  _id: string;
  userId: string;
  nickname: string;
}

export interface CreatedPost {
  _id: string;
  user: PopulatedUser;
  date: string;
  feeling: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiSuccess {
  data: CreatedPost;
}
interface ApiError {
  error: string;
}

export function useCreatePost() {
  const mutation = useMutation<CreatedPost, Error, CreatePostPayload>({
    mutationFn: async (payload: CreatePostPayload) => {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: ApiSuccess | ApiError = await res.json();
      if (!res.ok) {
        const message = (json as ApiError).error || "게시글 등록 실패";
        throw new Error(message);
      }
      return (json as ApiSuccess).data;
    },
  });

  return {
    createPost: mutation.mutate,
    createPostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
