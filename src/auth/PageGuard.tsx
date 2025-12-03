import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import api from "../interceptor/intercep";

interface PageGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function PageGuard({ children, allowedRoles }: PageGuardProps) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken(true);

        const res = await api.get(`/user/user-profiles/${user.uid}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 

        setRole(res.data.role);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
