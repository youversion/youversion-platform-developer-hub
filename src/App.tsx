import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import GetStarted from "./pages/GetStarted";
import Docs from "./pages/docs/Docs";
import SDKs from "./pages/docs/SDK";
import Examples from "./pages/Examples";
import BibleDirectory from "./pages/BibleDirectory";
import Support from "./pages/Support";
import StyleGuide from "./pages/StyleGuide";
import Authentication from "./pages/docs/Authentication";
import ApiReference from "./pages/docs/ApiReference";
import Verses from "./pages/docs/Verses";
import Bibles from "./pages/docs/Bibles";
import SearchDocs from "./pages/docs/SearchDocs";
import USFMReference from "./pages/docs/USFMReference";
import Endpoints from "./pages/docs/Endpoints";
import ForLLMs from "./pages/docs/ForLLMs";
import Platform from "./pages/Platform";
import Apps from "./pages/platform/Apps";
import Analytics from "./pages/platform/Analytics";
import Profiles from "./pages/platform/Profiles";
import Notifications from "./pages/platform/Notifications";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Callback from "./pages/Callback";
import Join from "./pages/Join";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 ">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/docs/quick-start" element={<Docs />} />
          <Route path="/docs/sdks" element={<SDKs />} />
          <Route path="/docs/authentication" element={<Authentication />} />
          <Route path="/docs/api" element={<ApiReference />} />
          <Route path="/docs/verses" element={<Verses />} />
          <Route path="/docs/bibles" element={<Bibles />} />
          <Route path="/docs/search" element={<SearchDocs />} />
          <Route path="/docs/api/endpoints" element={<Endpoints />} />
          <Route path="/docs/usfm-reference" element={<USFMReference />} />
          <Route path="/docs/examples" element={<Examples />} />
          <Route path="/docs/for-llms" element={<ForLLMs />} />
          <Route path="/bible-directory" element={<BibleDirectory />} />
          <Route path="/support" element={<Support />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/create-account" element={<Login />} />
          <Route path="/yv-connect" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/join" element={<Join />} />
          <Route path="/platform" element={<Platform />}>
            <Route path="apps" element={<Apps />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isDocsPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="youversion-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;