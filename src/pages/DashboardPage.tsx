import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStoryClusters, useStaticData } from "@/hooks/useNexusData";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight, ArrowDownRight, Minus, AlertTriangle,
  Newspaper, Activity, TrendingUp
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const trendIcon = (t: string) =>
  t === "up" ? <ArrowUpRight className="w-3 h-3 text-success" /> :
    t === "down" ? <ArrowDownRight className="w-3 h-3 text-destructive" /> :
      <Minus className="w-3 h-3 text-muted-foreground" />;

const sentimentBadge = (s: string) => {
  const map: Record<string, string> = {
    positive: "badge-positive", negative: "badge-negative",
    neutral: "badge-neutral", mixed: "badge-warning",
  };
  return map[s] || "badge-neutral";
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: storyClusters = [], isLoading } = useStoryClusters();
  const { trendingTopics, timelineData, heatmapData } = useStaticData();

  const totalArticles = storyClusters.reduce((a: number, s: any) => a + s.articleCount, 0);

  if (isLoading) {
    return (
      <AppShell>
        <div className="section-dashboard p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto min-h-[50vh] flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <div className="text-muted-foreground animate-pulse text-sm">Loading real-time API insights...</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="section-dashboard p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="live-dot" />
              <span className="ml-1.5 uppercase tracking-wider font-medium">Live</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A real-time overview of global narratives and emerging signals.
          </p>
          <div className="section-divider" />
        </motion.div>
