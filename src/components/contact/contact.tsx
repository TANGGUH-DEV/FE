import { useState } from "react";
import { Box, Container, Typography, TextField, Button,  Snackbar, Alert } from "@mui/material";

import { motion } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
    setFormData({ name: "", email: "", message: "" });
  };



  return (
    <Box sx={{ 
      bgcolor: "black", 
      color: "white", 
      minHeight: "auto", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      py: 6, 
      px: 2, 
      
      }}>

      <Container maxWidth="sm">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Typography variant="h5" gutterBottom>Get In Touch</Typography>
          <Typography color="gray">Have a project in mind? Let's create something amazing together.</Typography>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ mb: 3, input: { color: "white" }, label: { color: "gray" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "gray" }, "&:hover fieldset": { borderColor: "#0099ff" } } }}
          />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            sx={{ mb: 3, input: { color: "white" }, label: { color: "gray" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "gray" }, "&:hover fieldset": { borderColor: "#0099ff" } } }}
          />
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            multiline
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            sx={{ mb: 4, textarea: { color: "white" }, label: { color: "gray" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "gray" }, "&:hover fieldset": { borderColor: "#0099ff" } } }}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ bgcolor: "#0099ff", "&:hover": { bgcolor: "#0088ee" } }}>
            Send Message
          </Button>
        </motion.form>



        {/* Snackbar / Toast */}
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Message sent! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
