"use client";

import { useMutation } from "@tanstack/react-query";

export interface UpdateNicknamePayload {
  userId: string;
  nickname: string;
}

export interface UserResponse {
  _id: string;
  userId: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export function useUpdateNickname() {
  const mutation = useMutation<UserResponse, Error, UpdateNicknamePayload>({
    mutationFn: async (payload: UpdateNicknamePayload) => {
      const res = await fetch("/api/my", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "닉네임 변경 실패");
      }
      return data.data as UserResponse;
    },
  });

  return {
    updateNickname: mutation.mutate,
    updateNicknameAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
