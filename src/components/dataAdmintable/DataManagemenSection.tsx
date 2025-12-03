import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { auth } from "../../auth/firebase";
import api from "../../interceptor/intercep";
interface MediaData {
  id: number;
  title: string;
  description: string;
  file_get_optimized: string;
  media_type: string;
  created_at: string;
}

export const DataManagementSection: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMedia, setSelectedMedia] = useState<MediaData | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [mediaToDelete, setMediaToDelete] = useState<MediaData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "",
  });

  // -----------------------------
  // FETCH DATA
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();

        const res = await api.get("/media/media/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMediaList(res.data);
      } catch (error) {
        console.error("Gagal memuat data media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // -----------------------------
  // EDIT MEDIA
  const handleEditClick = (media: MediaData) => {
    setSelectedMedia(media);
    setFormData({
      title: media.title,
      description: media.description || "",
      media_type: media.media_type,
    });
    setOpenEditDialog(true);
  };

  const handleUpdate = async () => {
    if (!selectedMedia) return;
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const res = await api.patch(
        `/media/media/${selectedMedia.id}/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state mediaList
      setMediaList((prev) =>
        prev.map((m) => (m.id === selectedMedia.id ? res.data : m))
      );

      setOpenEditDialog(false);
      setSelectedMedia(null);
    } catch (error) {
      console.error("Gagal memperbarui data media:", error);
    }
  };

  // -----------------------------
  // DELETE MEDIA
  const handleDeleteClick = (media: MediaData) => {
    setMediaToDelete(media);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!mediaToDelete) return;
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      await api.delete(
        `/media/media/${mediaToDelete.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMediaList((prev) => prev.filter((m) => m.id !== mediaToDelete.id));
      setOpenDeleteDialog(false);
      setMediaToDelete(null);
    } catch (error) {
      console.error("Gagal menghapus data media:", error);
    }
  };

  // -----------------------------
  // RENDER
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography mt={2}>Memuat data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        📂 Manajemen Data Media
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Judul</TableCell>
              <TableCell sx={{ color: "#fff" }}>Deskripsi</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tipe</TableCell>
              <TableCell sx={{ color: "#fff" }}>Preview</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tanggal</TableCell>
              <TableCell sx={{ color: "#fff" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mediaList.map((media) => {
              const isVideo =
                media.media_type === "video" ||
                media.file_get_optimized.match(/\.(mp4|mov|avi|mkv)$/i);

              return (
                <TableRow key={media.id}>
                  <TableCell>{media.id}</TableCell>
                  <TableCell>{media.title}</TableCell>
                  <TableCell>{media.description || "-"}</TableCell>
                  <TableCell>{media.media_type}</TableCell>
                  <TableCell>
                    {isVideo ? (
                      <video width={100} controls>
                        <source
                          src={media.file_get_optimized}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <img
                        src={media.file_get_optimized}
                        alt={media.title}
                        width={80}
                        style={{ borderRadius: 8 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(media.created_at).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(media)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(media)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* -------- EDIT DIALOG -------- */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Media</DialogTitle>
        <DialogContent>
          <TextField
            label="Judul"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Deskripsi"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Tipe (image/video)"
            value={formData.media_type}
            onChange={(e) =>
              setFormData({ ...formData, media_type: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Batal</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------- DELETE CONFIRM -------- */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus media "{mediaToDelete?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
