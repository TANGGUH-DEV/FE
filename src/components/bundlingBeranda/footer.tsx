
import { Box, Container, Grid, Typography } from '@mui/material';
import { Instagram, Youtube, Music } from "lucide-react";
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

export default function Footer() {


  const getCurrentYear = () => {
    return new Date().getFullYear();
  }
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Music, label: "TikTok", href: "#" },
  ];

  return (
<Box
          sx={{
            bgcolor: 'grey.900',
            color: 'white',
            py: 6,
           
          }}
        >
          <Container maxWidth="lg">
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4}}>
                <Typography variant="h6" gutterBottom>
                  Tentang Layanan Kami
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Kami menyediakan jasa sewa drone profesional dengan pilot berpengalaman.
                  Cocok untuk dokumentasi acara, property, wisata, dan berbagai kebutuhan aerial photography.
                </Typography>
              </Grid>
           
              <Grid size={{xs: 12, md: 4}}>
                <Typography variant="h6" gutterBottom>
                  Kontak
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Email: info@FlightWaveAerials.com
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Telepon: -
                </Typography>
              </Grid>
           
              <Grid size={{ xs: 12 , md: 4}} >
                {/* Social Icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{ display: "flex", justifyContent:"flex-end", gap: "2rem", marginTop: "3rem" }}
                        >
                      {socialLinks.map((social) => (
                        <motion.div key={social.label} whileHover={{ scale: 1.1, y: -4 }}>
                          <IconButton
                          href={social.href}
                          aria-label={social.label}
                          sx={{ color: "gray", "&:hover": { color: "#0099ff" } }}
                        >
                          <social.icon size={28} />
                        </IconButton>
                      </motion.div>
                      ))}        
                </motion.div>
             </Grid>
          </Grid>  
          
          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', opacity: 0.6 }}>
              © {getCurrentYear()} FlightWaveAerials. All rights reserved.
            </Typography>
        </Container>
        </Box>

    );
}