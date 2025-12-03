
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
CircularProgress,
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/berita/berita/${slug}`); // backend harus support
        setData(res.data);
      } catch (error) {
        console.log("Error fetch detail:", error);
      }
    };

    fetchDetail();
  }, [slug]);

  if (!data)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="350"
          image={data.thumbnail}
          alt={data.title}
          style={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {data.title}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Kategori: {data.category}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{ typography: "body1", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
