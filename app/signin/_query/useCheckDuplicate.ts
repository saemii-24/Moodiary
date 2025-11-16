import { useQuery } from "@tanstack/react-query";

export function useCheckDuplicate() {
  const { data } = useQuery({
    queryKey: ["check-duplicate"],
    queryFn: async () => {
      const res = await fetch("/api/signin/duplicate", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to check duplicate");
      }
      return res.json();
    },
  });
  return {
    isDuplicate: data?.exists as boolean | undefined,
    isLoading: data.isLoading,
    isErorr: data.isError,
    refetch: data.refetch,
  };
}
