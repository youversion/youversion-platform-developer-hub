import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Index from "./pages/Index";
import GetStarted from "./pages/GetStarted";
import Docs from "./pages/Docs";
import Examples from "./pages/Examples";
import BibleDirectory from "./pages/BibleDirectory";
import Support from "./pages/Support";
import StyleGuide from "./pages/StyleGuide";
import Platform from "./pages/Platform";
import Apps from "./pages/platform/Apps";
import Analytics from "./pages/platform/Analytics";
import Settings from "./pages/platform/Settings";
import Notifications from "./pages/platform/Notifications";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/bible-directory" element={<BibleDirectory />} />
                <Route path="/support" element={<Support />} />
                <Route path="/style-guide" element={<StyleGuide />} />
                <Route path="/login" element={<Login />} />
                <Route path="/platform" element={<Platform />}>
                  <Route path="apps" element={<Apps />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
