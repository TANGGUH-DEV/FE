import { Camera, Map, Film } from 'lucide-react';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';

export default function Services() {
  const services = [
    {
      icon: Camera,
      title: 'Fotografi & Videografi',
      description: 'Konten aerial berkualitas tinggi untuk promosi, dokumentasi, dan proyek kreatif.',
      features: ['4K Video', 'RAW Foto', 'Cinematic Shots'],
    },
    {
      icon: Map,
      title: 'Pemetaan Lahan',
      description: 'Survey dan pemetaan area menggunakan teknologi drone dengan akurasi tinggi.',
      features: ['Orthophoto', 'Topografi'],
    },
    {
      icon: Film,
      title: 'Videografi Proyek',
      description: 'Produksi video untuk promosi, dokumentasi, atau media sosial.',
      features: ['Cinematic', 'Highlight Reel', 'Multi-angle'],
    },
  ];

  return (
    <Box component="section" sx={{ py: 12, px: 2, backgroundColor: 'grey.100' }}>
      <Box maxWidth="lg" mx="auto" textAlign="center" mb={10}>
        <Typography variant="h4" gutterBottom>
          Layanan Profesional
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
          Layanan drone profesional untuk Foto, Video, dan Pemetaan Lahan
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid size= {{xs:12, sm:6, md:4}} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: 'grey.800',
                color: 'white',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.contrastText',
                  mt: 2,
                  mx: 'auto',
                }}
              >
                <service.icon size={28} />
              </Box>

              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" color="white" mb={1}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="grey.400" mb={2}>
                  {service.description}
                </Typography>

                <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
                  {service.features.map((f, i) => (
                    <Typography
                      key={i}
                      variant="caption"
                      color="white"
                      sx={{ backgroundColor: 'grey.700', px: 1.5, py: 0.5, borderRadius: 1 }}
                    >
                      {f}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} textAlign="center">
        <Typography color="text.secondary" mb={3}>
          Punya proyek khusus? Mari diskusikan kebutuhan Anda
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Konsultasi Gratis
        </Button>
      </Box>
    </Box>
  );
}
