import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardPage from "./pages/DashboardPage";
import NarrativeExplorerPage from "./pages/NarrativeExplorerPage";
import ContradictionMapPage from "./pages/ContradictionMapPage";
import TimelinePage from "./pages/TimelinePage";
import ImpactInsightsPage from "./pages/ImpactInsightsPage";
import SearchQueryPage from "./pages/SearchQueryPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import TrendingPage from "./pages/TrendingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/narratives" element={<NarrativeExplorerPage />} />
            <Route path="/contradictions" element={<ContradictionMapPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/insights" element={<ImpactInsightsPage />} />
            <Route path="/search" element={<SearchQueryPage />} />
            <Route path="/story/:id" element={<StoryDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

// [Stage 25% | Commit 3 | 2026-03-24 23:33]

// [Stage 50% | Commit 9 | 2026-03-24 23:33]

// [Stage 100% | Commit 48 | 2026-03-24 23:34]
