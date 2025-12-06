import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Alert,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../../src/interceptor/intercep";

import { Navbar } from "../components/bundlingBeranda/navbar";
import Footer from "../components/bundlingBeranda/footer";
import { Link } from "react-router-dom";
import { Hero } from "../components/bundlingBeranda/hero";

export default function HalamanBerita() {
  const beritaData = useQuery({
    queryKey: ["berita"],
    queryFn: async () => {
      const res = await api.get("/berita/berita");
      return res.data;
    },
  });

  const stripHTML = (html: string) =>
    html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  const skeletonArray = Array.from({ length: 6 });

  return (
    <div>
      <Navbar
        activeSection="portfolio"
        onNavigate={(section) => console.log(section)}
      />

      <Hero
        imageUrl="./assets/image/background.png"
        title="Berita Terbaru"
        subtitle="Menyajikan berbagai berita terbaru seputar teknologi"
      />

      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Berita Terkini
        </Typography>

        {/* ================== LOADING STATE ================== */}
        {beritaData.isLoading && (
          <Grid container spacing={3}>
            {skeletonArray.map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Card sx={{ borderRadius: 3 }}>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton width="70%" />
                    <Skeleton width="40%" sx={{ mb: 1 }} />
                    <Skeleton height={60} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ================== ERROR STATE ================== */}
        {beritaData.error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            Gagal memuat berita, coba beberapa saat lagi.
          </Alert>
        )}

        {/* ================== LIST BERITA ================== */}
        {!beritaData.isLoading && beritaData.data && beritaData.data.length > 0 && (
          <Grid container spacing={3}>
            {beritaData.data.map((item: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    boxShadow: 3,
                    transition: "0.25s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                  }}
                >
                  <Link
                    to={`/berita/berita/${item.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        item.thumbnail ||
                        item.file_get_optimized ||
                        "/fallback.jpg"
                      }
                      alt={item.title}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = "/fallback.jpg")
                      }
                      style={{ objectFit: "cover" }}
                    />

                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                        sx={{ lineHeight: 1.3 }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        mb={1}
                      >
                        Kategori: {item.category}
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {stripHTML(item.content).slice(0, 150)}...
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ================== NO DATA ================== */}
        {!beritaData.isLoading &&
          beritaData.data &&
          beritaData.data.length === 0 && (
            <Typography mt={3}>Tidak ada berita</Typography>
          )}
      </Container>

      <Footer />
    </div>
  );
}
