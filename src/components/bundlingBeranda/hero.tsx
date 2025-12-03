import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Container } from "@mui/material";
import defaultFallback from "../../assets/image/background.png";

interface HeroProps {
  imageUrl: string;
  title?: string;        // <--- teks besar di tengah
  subtitle?: string;     // <--- teks kecil di bawahnya
  overlayColor?: string; // <--- warna gradasi overlay bisa diubah
  height?: string | number; // <--- tinggi section bisa disesuaikan
}


export function Hero({
  imageUrl,

  title = "Capturing the world from above.",
  subtitle = "Explore stunning aerial perspectives and breathtaking landscapes.",
  overlayColor = "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
  height = "100vh",
}: HeroProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: height,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image dengan animasi zoom out */}
      <motion.img
        src={imgSrc}
        alt="Aerial background"
        onError={handleError}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        loading="lazy"
      />

      {/* Overlay hitam transparan */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            overlayColor,
          zIndex: 1,
        }}
      />

      {/* Konten utama */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              maxWidth: "600px",
              mx: "auto",
              opacity: 0.85,
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 40,
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "9999px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "6px",
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: "50%",
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
