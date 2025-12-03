import { useState } from "react";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";

import api from "../../interceptor/intercep";
import { auth } from "../../auth/firebase";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryupload";

export default function BuatBeritaFull() {
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [kategori, setKategori] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { upload, progress } = useCloudinaryUpload();

  // -------------------------------
  // UPLOAD THUMBNAIL
  // -------------------------------
  const handleThumbnailUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail("");
    const url = await upload(file);
    setThumbnail(url);
  };

  // -------------------------------
  // UPLOAD GAMBAR DALAM QUILL
  // -------------------------------
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = await upload(file);

      const quill = document.querySelector(".ql-editor") as HTMLElement;
      if (quill) {
        const img = document.createElement("img");
        img.src = url;
        img.style.maxWidth = "100%";
        img.style.margin = "10px 0";
        quill.appendChild(img);
      }
    };

    input.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
      handlers: { image: handleImageUpload },
    },
  };

  // -------------------------------
  // SUBMIT SEMUA DATA KE API
  // -------------------------------
  const handleSubmit = async () => {
    if (progress > 0 && progress < 100) {
      alert("Tunggu sebentar, gambar masih diupload...");
      return;
    }

    if (!thumbnail) {
      alert("Thumbnail belum diupload!");
      return;
    }

    setLoadingSubmit(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User belum login!");

      const token = await user.getIdToken();

      await api.post(
        "/berita/berita-upload/",
        {
          title: judul,
          content: konten,
          thumbnail: thumbnail,
          category: kategori,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Berita berhasil disimpan!");

      // ========================
      // RESET FORM SETELAH SUKSES
      // ========================
      setJudul("");
      setKonten("");
      setThumbnail("");
      setKategori("");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan berita");
    }

    setLoadingSubmit(false);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3, p: 1 }}>
      <CardHeader
        title="Tulis Berita"
        subheader="Isi judul, thumbnail, dan konten berita"
      />

      <CardContent>
        <Stack direction="column" spacing={3}>

          {/* JUDUL */}
          <TextField
            label="Judul Berita"
            variant="outlined"
            fullWidth
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />

          {/* KATEGORI */}
          <FormControl fullWidth>
            <InputLabel id="kategori-label">Kategori Berita</InputLabel>
            <Select
              labelId="kategori-label"
              value={kategori}
              label="Kategori Berita"
              onChange={(e) => setKategori(e.target.value)}
            >
              <MenuItem value="national">Nasional</MenuItem>
              <MenuItem value="international">Internasional</MenuItem>
              <MenuItem value="technology">Teknologi</MenuItem>
              <MenuItem value="entertainment">Hiburan</MenuItem>
            </Select>
          </FormControl>

          {/* THUMBNAIL */}
          <Stack spacing={1}>
            <Typography fontWeight={600}>Thumbnail Berita</Typography>

            <Button variant="outlined" component="label">
              Pilih Gambar
              <input type="file" hidden accept="image/*" onChange={handleThumbnailUpload} />
            </Button>

            {thumbnail && (
              <img
                src={thumbnail}
                style={{ width: "200px", marginTop: 10, borderRadius: 10 }}
              />
            )}
          </Stack>

          {/* PROGRESS BAR */}
          {progress > 0 && progress < 100 && (
            <Stack>
              <Typography>Upload gambar… {progress}%</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Stack>
          )}

          {/* QUILL */}
          <div style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <ReactQuill
              value={konten}
              onChange={setKonten}
              modules={modules}
              theme="snow"
              style={{ minHeight: 200, backgroundColor: "white" }}
            />
          </div>

          {/* SUBMIT */}
          <Button
            variant="contained"
            disabled={loadingSubmit}
            onClick={handleSubmit}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {loadingSubmit ? "Menyimpan..." : "Simpan Berita"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
