"use client";

import { useMutation } from "@tanstack/react-query";

export interface EditPostPayload {
  userId: string;
  dateKey: number; // YYYYMMDD
  feeling: string;
  title: string;
  content: string;
}

export interface UserInfo {
  userId: string;
  nickname: string;
}

export interface PostResponse {
  _id: string;
  user: UserInfo;
  dateKey: number;
  feeling: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function useEditPost() {
  const mutation = useMutation<PostResponse, Error, EditPostPayload>({
    mutationFn: async (payload: EditPostPayload) => {
      const res = await fetch("/api/post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "수정에 실패했습니다");
      }
      return data.data as PostResponse;
    },
  });

  return {
    editPost: mutation.mutate,
    editPostAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
