import  { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  CssBaseline,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  IconButton,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { Hero } from "../components/bundlingBeranda/hero";
import { Navbar } from "../components/bundlingBeranda/navbar";
import Footer from "../components/bundlingBeranda/footer";
import { Close as CloseIcon } from "@mui/icons-material";

import api from "../interceptor/intercep";
 
const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
  },
});

interface MediaItem {
  id: string;
  url: string;
  title: string;
  deskripsi: string;
  type: "image" | "video";
}

export default function PortfolioDrone() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [nextPage, setnextPage] = useState<string | null>("/public-media/");
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [page, setPage] = useState(1);


  // ✅ Pastikan semua video berhenti saat dialog dibuka atau ditutup
  useEffect(() => {
    const allVideos = document.querySelectorAll("video");
    if (selectedItem) {
      // Saat dialog terbuka, hentikan semua video di halaman utama
      allVideos.forEach((vid) => {
        vid.pause();
        vid.currentTime = 0;
      });
    } else {
      // Saat dialog ditutup, pastikan tidak ada video jalan
      allVideos.forEach((vid) => {
        vid.pause();
      });
    }
  }, [selectedItem]);

  // ✅ Fetch data dari backend
  useEffect(() => {
    if (!nextPage && page > 1) return;
    setLoading(true);

    api
      .get("/media/public-media/")
      .then((res) => {
        const data = res.data;
        const mapped: MediaItem[] = res.data.results.map((i: any) => ({
          id: i.id.toString(),
          url: i.file_get_optimized,
          title: i.title,
          deskripsi: i.description,
          type: i.media_type === "video" ? "video" : "image",
        }));
        setItems(mapped);
        setnextPage(data.next);
        setPrevPage(data.previous); 
      })
     
      .catch((err) => console.error("Error fetch media:", err))
      .finally(() => setLoading(false));

  }, [page]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar
          activeSection="portfolio"
          onNavigate={(section) => console.log(section)}
        />

        {/* HERO */}
        <Hero
          imageUrl="./assets/image/background.png"
          title="Hasil Footage Drone Profesional"
          subtitle="Dokumentasi aerial berkualitas tinggi untuk berbagai kebutuhan Anda"
        />

        {/* GALLERY */}
        <Container sx={{ mt: 6, mb: 10 }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {items.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  // ✅ Sebelum buka dialog, hentikan semua video di halaman
                  document.querySelectorAll("video").forEach((vid) => {
                    vid.pause();
                    vid.currentTime = 0;
                  });
                  setSelectedItem(item);
                }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {item.type === "image" ? (
                  <Box
                    component="img"
                    src={item.url}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    component="video"
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    width="100%"
                    sx={{
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.title}
                  </Typography>
                  {item.deskripsi && (
                    <Typography variant="body2" color="text.secondary">
                      {item.deskripsi}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}

            
          </Masonry>
        </Container>
        <Box display="flex" justifyContent="center" pb={4} gap={2} mt={4}>
          <Button
            variant="outlined"
            disabled={!prevPage}
            onClick={() => {
              if (prevPage) {
                setnextPage(prevPage);
                setPage(page - 1);
              }
            }}
          >
            Previous
          </Button>

          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Page {page}
          </Typography>

          <Button
            variant="contained"
            disabled={!nextPage}
            onClick={() => {
              if (nextPage) {
                setnextPage(nextPage);
                setPage(page + 1);
              }
            }}
          >
            Next
          </Button>
        </Box>

        {/* DIALOG FULLSCREEN */}
        <Dialog
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          fullScreen
          PaperProps={{
            sx: {
              bgcolor: "black",
              color: "white",
              position: "relative",
            },
          }}
        >
          {selectedItem && (
            <>
              <IconButton
                onClick={() => setSelectedItem(null)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "white",
                  bgcolor: "rgba(27, 44, 227, 0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  p: 2,
                }}
              >
                {selectedItem.type === "video" ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "90vh",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "90vh",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>

              <Box sx={{ textAlign: "center", p: 2, bgcolor: "black" }}>
                <Typography variant="h5">{selectedItem.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {selectedItem.deskripsi}
                </Typography>
              </Box>
            </>
          )}
        </Dialog>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
