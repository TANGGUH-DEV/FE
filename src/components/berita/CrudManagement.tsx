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

import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";

import { auth } from "../../auth/firebase";
import api from "../../interceptor/intercep";

interface NewsData {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  thumbnail: string;
  file_get_optimized: string;
  created_at: string;
  updated_at: string;
}

export const NewsManagementSection: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [newsToDelete, setNewsToDelete] = useState<NewsData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  // -----------------------------
  // FETCH DATA BERITA
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();

        const res = await api.get("/berita/berita-upload/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNewsList(res.data);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // -----------------------------
  // EDIT BERITA
  const handleEditClick = (news: NewsData) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      category: news.category,
    });
    setOpenEditDialog(true);
  };

  const handleUpdate = async () => {
    if (!selectedNews) return;
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const res = await api.patch(
        `/berita/berita-upload/${selectedNews.id}/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state
      setNewsList((prev) =>
        prev.map((n) => (n.id === selectedNews.id ? res.data : n))
      );

      setOpenEditDialog(false);
      setSelectedNews(null);
    } catch (error) {
      console.error("Gagal memperbarui berita:", error);
    }
  };

  // -----------------------------
  // DELETE BERITA
  const handleDeleteClick = (news: NewsData) => {
    setNewsToDelete(news);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!newsToDelete) return;
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      await api.delete(`/media/news/${newsToDelete.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewsList((prev) => prev.filter((n) => n.id !== newsToDelete.id));
      setOpenDeleteDialog(false);
      setNewsToDelete(null);
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
    }
  };

  // -----------------------------
  // LOADING
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography mt={2}>Memuat berita...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        📰 Manajemen Berita
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Judul</TableCell>
              <TableCell sx={{ color: "#fff" }}>Kategori</TableCell>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Tanggal</TableCell>
              <TableCell sx={{ color: "#fff" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {newsList.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.id}</TableCell>
                <TableCell>{news.title}</TableCell>
                <TableCell>{news.category}</TableCell>
                <TableCell>
                  <img
                    src={news.file_get_optimized}
                    alt={news.title}
                    width={90}
                    style={{ borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(news.created_at).toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(news)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ ml: 1 }}
                    onClick={() => handleDeleteClick(news)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* -------- EDIT DIALOG -------- */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Berita</DialogTitle>
        <DialogContent>
          <TextField
            label="Judul"
            fullWidth
            margin="dense"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextField
            label="Kategori"
            fullWidth
            margin="dense"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <Typography mt={2} mb={1}>
            Konten Berita:
          </Typography>
          <ReactQuill
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            theme="snow"
            style={{ height: "250px", marginBottom: "50px" }}
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
            Hapus berita "{newsToDelete?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
