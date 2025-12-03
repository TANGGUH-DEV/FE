import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";

interface Berita {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

interface BeritaListProps {
  data: Berita[];
  isLoading: boolean;
}

export function BeritaList({ data, isLoading }: BeritaListProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        textAlign="center"
        sx={{ letterSpacing: 1 }}
      >
        Berita Terbaru
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          Tidak ada berita.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid size={{xs: 12, md: 4, sm:6 }} key={item.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Link
                  to={`/berita/berita/${item.slug}`}
                  style={{ textDecoration: "none", color: "inherit", flex: 1 }}
                >
                  <CardMedia
                    component="img"
                    image={item.thumbnail}
                    alt={item.title}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={1}
                    >
                      {item.category} • {new Date(item.created_at).toLocaleDateString()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {item.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
