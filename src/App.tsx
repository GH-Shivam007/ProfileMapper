
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ProfileView from "./pages/ProfileView";
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute isAdmin><Admin /></ProtectedRoute>} />
              <Route path="/admin/add" element={<ProtectedRoute isAdmin><AdminPanel mode="add" /></ProtectedRoute>} />
              <Route path="/admin/edit/:id" element={<ProtectedRoute isAdmin><AdminPanel mode="edit" /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
