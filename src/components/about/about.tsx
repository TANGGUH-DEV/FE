import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightIcon from '@mui/icons-material/Flight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import back from "../../assets/image/Back.png";

export default function About() {
  const stats = [
    { icon: <AccessTimeIcon color="primary" />, label: 'Pengalaman', value: '1 Tahun' },
    { icon: <FlightIcon color="primary" />, label: 'Jam Terbang', value: '50+ Jam' },
    { icon: <EmojiEventsIcon color="primary" />, label: 'Proyek', value: '10+' },
  ];

  const certifications = [
    'Pilot Drone Mini 3',
    'Izin Operasi Komersial',
    'Pelatihan Keselamatan',
  ];

  return (
    <Box component="section" id="about" sx={{ py: 12, px: 2, backgroundColor: 'grey.50' }}>
      <Box maxWidth="lg" mx="auto" textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Tentang Saya
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={500} mx="auto">
          Pilot drone profesional siap membantu menciptakan konten aerial berkualitas tinggi.
        </Typography>
      </Box>

      <Grid container spacing={6} alignItems="center">
        {/* Image */}
        <Grid size={{xs:12, md: 6}}>
          <Box
            component="img"
            src={back}
            alt="Drone pilot"
            sx={{ width: '100%', borderRadius: 3, objectFit: 'cover', maxHeight: 500 }}
          />
        </Grid>

        {/* Content */}
        <Grid size={{xs:12, md:6}}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Pilot Drone Bersertifikat
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4} sx={{ lineHeight: 1.6 }}>
            Profesional dalam fotografi dan videografi aerial, mengutamakan keselamatan dan hasil memukau.
          </Typography>

          {/* Stats */}
          <Grid container spacing={2} mb={4}>
            {stats.map((stat, index) => (
              <Grid size={{xs:4}} key={index}>
                <Card
                  sx={{
                    bgcolor: 'white',
                    textAlign: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: 5 },
                  }}
                >
                  <CardContent>
                    <Box mb={1}>{stat.icon}</Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {stat.label}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Certifications */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Sertifikasi
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {certifications.map((cert, index) => (
                <Box
                  key={index}
                  component="li"
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {cert}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
