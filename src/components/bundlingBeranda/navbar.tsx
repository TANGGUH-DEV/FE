import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { motion } from 'framer-motion';
import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection}: NavbarProps) {

  const Navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Button
            onClick={() => Navigate("/")}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
              "&:hover": { opacity: 0.8 },
            }}
          >
            <Plane size={22} color="#0099ff" />
            
            <Typography variant="subtitle1" fontWeight={500}>
              Flight Wave
            </Typography>
          </Button>

          {/* Menu */}
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button
              onClick={() => Navigate("/")}
              sx={{
                color:
                  activeSection === "portfolio" ? "#0099ff" : "white",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": { color: "#0099ff" },
              }}
            >
              Beranda
            </Button>

            <Button
              onClick={() => Navigate("/project")}
              sx={{
                color: activeSection === "contact" ? "#0099ff" : "white",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": { color: "#0099ff" },
              }}
            >
              Gallery
            </Button>

             <Button
              onClick={() => Navigate("/berita")}
              sx={{
                color: activeSection === "contact" ? "#0099ff" : "white",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": { color: "#0099ff" },
              }}
            >
              Berita
            </Button>

            <Button
              onClick={() => Navigate("/login")}
              sx={{
                color: activeSection === "contact" ? "#0099ff" : "white",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": { color: "#0099ff" },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}
