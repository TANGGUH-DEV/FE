import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import api from "../../interceptor/intercep";
import { auth } from "../../auth/firebase"; // pastikan ini Firebase auth
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

interface UserFormProps {
  onSuccess?: (data: any) => void; // opsional callback ke parent
}

export const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    deskripsi: "",
    skill: "",
    github: "",
    portfolio_link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ambil user Firebase yang login
      const user = auth.currentUser;
      if (!user) throw new Error("User belum login");

      const token = await user.getIdToken();

      const response = await api.post(
        "/user-profiles/",
        formData,
        
        {
          
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Mengirim data ke API:", formData);

      console.log("Data berhasil dikirim:", response.data);

      if (onSuccess) onSuccess(response.data);

      alert("✅ Data berhasil disimpan!");
      setFormData({ deskripsi: "", skill: "", github: "", portfolio_link: "" });
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      alert("❌ Terjadi kesalahan saat menyimpan data. Pastikan Anda sudah login dan API benar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Lengkapi Profil Portfolio Anda
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Mohon lengkapi informasi dasar agar pengalaman portfolio Anda lebih lengkap.
      </Typography>

      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, background: "#fafafa" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{xs:12}} >
              <TextField
                label="Deskripsi Singkat"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>

            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Skill Utama"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Link GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{xs:12}}>
              <TextField
                label="Link Portfolio (Opsional)"
                name="portfolio_link"
                value={formData.portfolio_link}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{xs:12}}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  px: 6,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: "#1976d2",
                  fontWeight: "bold",
                  display: "block",
                  mx: "auto",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                {loading ? "Menyimpan..." : "Simpan & Lanjutkan"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
