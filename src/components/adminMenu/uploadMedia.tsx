// src/components/MediaUploader.tsx
import React, { useState } from "react";
import api from "../../interceptor/intercep";
import { auth } from "../../auth/firebase";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryupload";




export const MediaUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [loading, setLoading] = useState(false);


  const {upload, progress} = useCloudinaryUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (!file) throw new Error ("pilih file terlebih dahulu!");
      
      //mengambil token user sebelum mengirim ke cloudinary
      const user = auth.currentUser;
      if (!user) throw new Error("User belum login");
      //mengambil token
      const token = await user.getIdToken();

      // fungsi untuk upload file ke cloudinary meleewait hooks 
      //perhatikan statement diawal try
      const fileUrl= await upload (file);


      
      const djangoPayload = {
        title,
        description,
        file_url: fileUrl,
        media_type: mediaType,
      };

      const res = await api.post(
        "/media/media/",
        djangoPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Media berhasil diunggah dan disimpan!");
      console.log("Saved:", res.data);

      // reset
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("❌ Gagal mengunggah media.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          Unggah Media Profil
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*"
            required
          />

          <TextField
            label="Judul Media"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Tipe Media"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            fullWidth
            select
            margin="normal"
            required
          >
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="audio">Audio</MenuItem>

          </TextField>

        {file && (
            <Box mt={2}>
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              ) : (
                <video width="100%" controls>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </video>
              )}
            </Box>
          )}
        {loading && (
                <Box mt={2}>
                <Typography variant="body2">Mengunggah: {progress}%</Typography>
                <Box sx={{ height: 10, backgroundColor: "#ddd", borderRadius: 5 }}>
                    <Box
                    sx={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "#4caf50",
                        borderRadius: 5,
                        transition: "width 0.3s ease",
                    }}
                    />
                </Box>
                </Box>
            )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !file}
            sx={{ mt: 3 }}
            fullWidth
          >
            {loading ? "Mengunggah..." : "Unggah & Simpan"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
