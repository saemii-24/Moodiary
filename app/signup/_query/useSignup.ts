import { useMutation } from "@tanstack/react-query";

export interface SigninPayload {
  userId: string;
  nickname: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  userId: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiSuccess {
  data: UserResponse;
}
interface ApiError {
  error: string;
}

export function useSignup() {
  const mutation = useMutation<UserResponse, Error, SigninPayload>({
    mutationFn: async (payload: SigninPayload) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: ApiSuccess | ApiError = await res.json();
      if (!res.ok) {
        const message = (json as ApiError).error || "가입 요청 실패";
        throw new Error(message);
      }
      return (json as ApiSuccess).data;
    },
  });

  return {
    createUser: mutation.mutate,
    createUserAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
