import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Beranda";
import LoginPage from "./pages/login";
import { AdminDashboard } from "./pages/AdminDashboard";
import AuthGuard from "../src/auth/Auth Guard";
import { AuthProvider } from "./auth/authContext";
import PortfolioDrone from "./pages/projectPage";
import Admin from "./pages/admin";
import User from "./pages/user";
import PageGuard from "./auth/PageGuard";
import { BeritaDetail } from "./components/berita/detail";
import { BeritaList } from "./components/berita/halamanBerita";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HalamanBerita from "./pages/Berita";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/project" element={<PortfolioDrone />} />
            <Route path="/berita" element = {<HalamanBerita/>} />
            <Route path="/berita/berita" element={<BeritaList data={[]} isLoading={false} />} />
            <Route path="/berita/berita/:slug" element={<BeritaDetail />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <PageGuard allowedRoles={["ADMIN", "SUPERADMIN"]}>
                    <Admin />
                  </PageGuard>
                </AuthGuard>
              }
            />

            {/* Superadmin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                <AuthGuard>
                  <PageGuard allowedRoles={["SUPERADMIN"]}>
                    <AdminDashboard />
                  </PageGuard>
                </AuthGuard>
              }
            />

            {/* User */}
            <Route
              path="/user"
              element={
                <AuthGuard>
                  <PageGuard allowedRoles={["USER"]}>
                    <User />
                  </PageGuard>
                </AuthGuard>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
