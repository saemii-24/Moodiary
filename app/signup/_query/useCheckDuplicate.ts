import { useQuery } from "@tanstack/react-query";

export function useCheckDuplicate({ userId }: { userId: string }) {
  const query = useQuery({
    queryKey: ["check-duplicate", userId],
    queryFn: async () => {
      const res = await fetch(`/api/signup/duplicate?userId=${userId}`);
      if (!res.ok) {
        throw new Error("Failed to check duplicate");
      }
      return res.json();
    },
    enabled: false, // 버튼 눌렀을 때만 실행
  });

  return {
    isDuplicate: query.data?.exists,
    isLoading: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
