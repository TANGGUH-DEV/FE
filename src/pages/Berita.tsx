import { Typography, Container, Grid, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../../src/interceptor/intercep";
import {Divider} from "@mui/material";
import { Navbar } from "../components/bundlingBeranda/navbar";
import Footer from "../components/bundlingBeranda/footer";
import {Link} from "react-router-dom";
import { Hero } from "../components/bundlingBeranda/hero";


export default function HalamanBerita() {
  const beritaData = useQuery({
    queryKey: ["berita"],
    queryFn: async () => {
      const res = await api.get("/berita/berita");
      return res.data;
    },
  });

  return (
    <div>
      <Navbar activeSection="portfolio" onNavigate={(section) => console.log(section)}/>

      <Hero
        imageUrl="./assets/image/background.png"
        title="Berita Terbaru "
        subtitle="Menyajikan berbagai berita terbaru seputar teknologi"
      />
      <Container maxWidth="lg" sx={{ marginTop: 4 , marginBlockEnd: 3}}>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Berita Terkini
        </Typography>

        {/* LIST BERITA */}
        <Grid container spacing={3}>
          {beritaData.isLoading ? (
            <CircularProgress />
          ) : beritaData.data && beritaData.data.length > 0 ? (
            beritaData.data.map((item: any) => (
              <Grid size={{xs: 12, md: 4 ,sm : 6}}  key={item.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <Link
                    to={`/berita/berita/${item.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.thumbnail}
                    alt={item.title}
                  />
                  <CardContent>
                    
                    <Typography>
                      {item.title}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                      Kategori: {item.category}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" color="text.secondary">
                      {item.content.replace(/<[^>]+>/g, "").slice(0, 150)} ...
                </Typography>
                  </CardContent>

                </Link>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>Tidak ada berita</Typography>
          )}
        </Grid>

        {/* DETAIL BERITA */}
      </Container>

      <Footer />
    </div>
  );
}
