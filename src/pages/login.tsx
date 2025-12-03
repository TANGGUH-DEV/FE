import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import {useNavigate } from "react-router-dom";

import api from "../interceptor/intercep";
import background from "../assets/image/background.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  const Navigate = useNavigate();
  const validate = (): string | null => {
    if (!email.trim() || !password) return "Email dan password wajib diisi.";
    if (!validateEmail(email)) return "Masukkan alamat email yang valid.";
    if (password.length < 2)
      return "Password harus minimal 2 karakter.";
    return null;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {

      // login ke firebase nya
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken(true);


      // kirim token untuk verifikasi token apakah valid atau tidak
      const res = await api.post(
        "verify/verify-token/", {},
        { 
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
            
          },

        }
      
      );



      console.log("Token verified:");
      setMessage("Login berhasil! Selamat datang kembali.");
      // Lakukan tindakan setelah login berhasil, misalnya redirect
      setEmail("");
      setPassword("");   
      
      const UserRole = res.data.role?.toLowerCase();
      

      if (UserRole === "superadmin") {
        Navigate("/admin-dashboard");
      } 
      else if (UserRole === "admin") {
        Navigate("/admin");
      }
      else {
        Navigate("/user");
      }

 

    } catch (err: any) {
      // belum bekerja sesuai dengan harapan
      //tambahkan LOG 


      switch (err.code) {
      case "auth/user-not-found":
        setError("Akun tidak ditemukan.");
        break;
      case "auth/wrong-password":
        setError("Password salah.");
        break;
      case "auth/invalid-email":
        setError("Format email tidak valid.");
        break;
      default:
        setError("Gagal login. Silakan coba lagi.");
        console.error(err);
        break;
    }
    } finally {
    setLoading(false);
    }
  };

  return (

    // ini adalah sebuah background gradient biru dengan form login di tengah
    // pastikan form login memiliki input email, password, tombol submit, dan menampilkan pesan error atau sukses
    // gunakan komponen dari MUI untuk membuat tampilan yang menarik
    // Rubah sesuai kebutuhan Anda 

    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
          url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          bgcolor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // untuk Safari
          border: "1px solid rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          mb={3}
          color="primary"
        >
          Login to Dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
            inputProps={{ minLength: 6 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              py: 1.3,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Typography
          variant="body2"
          textAlign="center"
          mt={3}
          color="text.secondary"
        >
          Demo Login: user@example.com / password
        </Typography>
      </Paper>

    </Box>

   
    
  );
}
