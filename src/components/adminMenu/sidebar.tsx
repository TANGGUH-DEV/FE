import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import StorageIcon from "@mui/icons-material/Storage";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import NewspaperIcon from '@mui/icons-material/Newspaper';

interface SidebarProps {
  onSelect: (page: string) => void;
}

const drawerWidth = 250;

export const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const menuItems = [
    { text: "User", value: "user", icon: <PeopleIcon /> },
    { text: "Upload Berita", value: "upload", icon: <CloudUploadIcon /> },
    { text: "Edit Berita", value: "Edit Berita", icon: <NewspaperIcon /> },
    { text: "Manajemen Data", value: "data", icon: <StorageIcon /> },
    { text: "Media", value: "media", icon: <PermMediaIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #0d47a1 0%, #1976d2 100%)",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      {/* Header */}
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            letterSpacing: 1,
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.value} disablePadding>
              <ListItemButton
                onClick={() => onSelect(item.value)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateX(6px)",
                    transition: "0.3s",
                  },
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer / Branding */}
      <Box sx={{ mt: "auto", p: 2, textAlign: "center", opacity: 0.7 }}>
        <Typography variant="body2">© 2025 Admin System</Typography>
      </Box>
    </Drawer>
  );
};
