import { useState } from "react";
import axios from "axios";
import api from "../interceptor/intercep";
import { auth } from "../auth/firebase";

export const useCloudinaryUpload = () => {
  const [progress, setProgress] = useState(0);

  const upload = async (file: File): Promise<string> => {
    const user = auth.currentUser;
    const token = await user?.getIdToken();

    const preset = "ml_default";
    const uploadFolder = "media";

    const res = await api.get("/media/cloudinary-signature/", {
      params: {
        upload_preset: preset,
        folder: uploadFolder,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    const { signature, timestamp, api_key, cloud_name, upload_preset, folder } =
      res.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

    const result = await axios.post(uploadUrl, formData, {
      onUploadProgress: (e) => {
        if (e.total) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      },
    });

    return result.data.secure_url;
  };

  return { upload, progress };
};
