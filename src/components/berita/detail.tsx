// === Halaman Detail Berita per Slug ===
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../interceptor/intercep";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Skeleton,
  Alert,
  Divider,
} from "@mui/material";

interface Berita {
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

export function BeritaDetail() {
  const { slug } = useParams();
  const [data, setData] = useState<Berita | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0); // auto ke atas
  }, [slug]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/berita/berita/${slug}`);
        setData(res.data);
      } catch (err) {
        setError("Berita tidak ditemukan atau server bermasalah.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  // ===========================
  // LOADING STATE
  // ===========================
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 3 }} />
        <Box sx={{ mt: 2 }}>
          <Skeleton height={40} width="70%" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} width="80%" />
        </Box>
      </Container>
    );
  }

  // ===========================
  // ERROR STATE
  // ===========================
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) return null;

  // Thumbnail fallback
  const imageToShow = data.thumbnail || data.file_get_optimized || "/fallback.jpg";

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="350"
          image={imageToShow}
          alt={data.title}
          onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.jpg")}
          style={{ objectFit: "cover" }}
        />

        <CardContent sx={{ px: 3, py: 4 }}>
          {/* Judul */}
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ lineHeight: 1.3 }}
          >
            {data.title}
          </Typography>

          {/* Kategori */}
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Kategori: {data.category}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Konten HTML */}
          <Box
            sx={{
              typography: "body1",
              lineHeight: 1.8,
              "& img": {
                maxWidth: "100%",
                borderRadius: 2,
                mt: 2,
                mb: 2,
              },
              "& p": {
                mb: 2,
              },
            }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
