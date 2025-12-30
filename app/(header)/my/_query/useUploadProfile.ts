import { useMutation } from "@tanstack/react-query";

type UploadProfileReq = {
  imageUrl: string;
};

type UploadProfileRes = {
  secureUrl: string;
  publicId: string;
};

async function uploadProfile(payload: UploadProfileReq): Promise<UploadProfileRes> {
  const res = await fetch("/api/profile/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? "Upload failed");
  }

  return res.json();
}

export default function useUploadProfile() {
  const mutation = useMutation<UploadProfileRes, Error, UploadProfileReq>({
    mutationFn: uploadProfile,
  });

  return {
    uploadPending: mutation.isPending,
    uploadProfile: mutation.mutate,
    uploadProfileAsync: mutation.mutateAsync,
    uploadData: mutation.data,
    uploadError: mutation.error,
    resetUpload: mutation.reset,
    uploadStatus: mutation.status,
  };
}
