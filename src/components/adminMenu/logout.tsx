import { Button } from "@mui/material";
import { auth } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";


export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // logout dari Firebase
      navigate("/login"); // redirect ke login atau halaman publik
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color= "error"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
