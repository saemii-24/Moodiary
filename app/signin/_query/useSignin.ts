import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

type SigninParams = {
  userId: string;
  password: string;
};

export function useSignin() {
  return useMutation({
    mutationFn: async (data: SigninParams) => {
      const res = await signIn("credentials", {
        redirect: false,
        userId: data.userId,
        password: data.password,
      });

      if (!res || res.error) {
        throw new Error(res?.error || "로그인 실패");
      }

      return res;
    },
  });
}
