import { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Chip } from '@mui/material';
import { MapPin, Calendar } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Videografi Cityscape',
      category: 'video',
      location: 'Jakarta, Indonesia',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1643145803693-41dd50195f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      description: 'Cinematic aerial footage untuk promosi kota',
      tags: ['Videografi', 'Cinematic'],
    },
    {
      id: 2,
      title: 'Fotografi Landscape',
      category: 'foto',
      location: 'Bali, Indonesia',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1628155843540-a3d476bb29c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      description: 'Foto udara dengan komposisi artistik',
      tags: ['Foto', 'Landscape'],
    },
    {
      id: 3,
      title: 'Pemetaan Lahan Perkebunan',
      category: 'lahan',
      location: 'Sumatera, Indonesia',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1706591790337-709264975df5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Survey dan pemetaan area perkebunan seluas 500 hektar',
      tags: ['Pemetaan', 'Survey'],
    },
  ];

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'foto', label: 'Foto' },
    { id: 'video', label: 'Video' },
    { id: 'lahan', label: 'Lahan' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <Box component="section" sx={{ py: 10, px: 2, backgroundColor: 'grey.900' }}>
      <Box maxWidth="lg" mx="auto" textAlign="center" mb={8}>
        <Typography variant="h4" gutterBottom color='white'>
          Portfolio Karya
        </Typography>
        <Typography variant="body1" color="grey.400" maxWidth={600} mx="auto">
          Koleksi proyek aerial drone terbaik dalam Foto, Video, dan Pemetaan Lahan
        </Typography>
      </Box>

      {/* Filter */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mb={6}>
        {categories.map(cat => (
          <Chip
            key={cat.id}
            label={cat.label}
            onClick={() => setFilter(cat.id)}
            variant={filter === cat.id ? 'filled' : 'outlined'}
            sx={{
              cursor: 'pointer',
              px: 2,
              py: 0.5,
              color: 'white',
              borderColor: 'white',
              fontSize: 13,
              '&.MuiChip-outlined:hover': { backgroundColor: 'grey.800' },
              '&.MuiChip-filled': { backgroundColor: 'primary.main', color: 'white' },
            }}
          />
        ))}
      </Box>

      {/* Portfolio Grid */}
      <Grid container spacing={4} justifyContent="center">
        {filteredProjects.map(project => (
          <Grid size= {{xs:12, sm:6, md:4}} key={project.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'grey.800',
                color: 'white',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
              }}
            >
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{ width: '100%', height: 220, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {project.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" color="info" variant="outlined" sx={{ borderColor: 'white', color: 'white' }} />
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom>{project.title}</Typography>
                <Typography variant="body2" color="grey.300" mb={1} flexGrow={1}>
                  {project.description}
                </Typography>

                <Box display="flex" gap={2} mt="auto" color="grey.400">
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <MapPin size={16} />
                    <Typography variant="body2">{project.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Calendar size={16} />
                    <Typography variant="body2">{project.date}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
