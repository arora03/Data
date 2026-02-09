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
