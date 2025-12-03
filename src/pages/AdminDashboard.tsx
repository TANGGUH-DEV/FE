import React, { useState } from "react";
import { Box, Toolbar, Typography, Paper, Fade, Divider } from "@mui/material";
import { Sidebar } from "../components/adminMenu/sidebar";
import { UserForm } from "../components/adminMenu/UserForm";
import { DataManagementSection } from "../components/dataAdmintable/DataManagemenSection";
import LogoutButton from "../components/adminMenu/logout";
import { MediaUploader } from "../components/adminMenu/uploadMedia";
import BeritaPage from "../components/berita/quill";
import { NewsManagementSection } from "../components/berita/CrudManagement";

export const AdminDashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("user");

  const renderContent = () => {
    switch (selectedPage) {
      case "user":
        return <UserForm />;
      case "upload":
        return <BeritaPage />;
      case "Edit Berita":
        return <NewsManagementSection />;
      case "data":
        return <DataManagementSection />;
      case "media":
        return <MediaUploader />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* Sidebar kiri */}
      <Sidebar onSelect={setSelectedPage} />

      {/* Konten utama */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          transition: "all 0.3s ease",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header bar */}
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#333",
                letterSpacing: 0.5,
              }}
            >
              Admin Dashboard
            </Typography>
            <LogoutButton />
          </Toolbar>

          <Divider sx={{ mb: 3 }} />

          {/* Konten halaman yang berubah */}
          <Fade in timeout={400}>
            <Box sx={{ minHeight: "70vh" }}>{renderContent()}</Box>
          </Fade>
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4, color: "text.secondary", fontSize: 13 }}>
          © {new Date().getFullYear()} Sistem Admin — All Rights Reserved
        </Box>
      </Box>
    </Box>
  );
};
