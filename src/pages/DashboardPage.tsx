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

        {/* Stats Row */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={stagger} initial="hidden" animate="show">
          {[
            { label: "Total Articles", value: totalArticles.toLocaleString(), icon: Newspaper, change: "+12.4%" },
            { label: "Active Stories", value: storyClusters.length.toString(), icon: Activity, change: "+3" },
            { label: "Contradictions", value: storyClusters.reduce((a, s) => a + s.contradictions, 0).toString(), icon: AlertTriangle, change: "+5" },
            { label: "Trending Topics", value: trendingTopics.length.toString(), icon: TrendingUp, change: "+2" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="surface-card p-4 relative overflow-hidden">
              <div className="accent-line-top bg-gradient-to-r from-transparent via-section-dashboard/20 to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-[11px] text-success font-medium font-mono">{stat.change}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Stories */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top Stories</h2>
            <button className="text-[11px] text-primary hover:underline">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {storyClusters.map((story) => (
              <motion.div
                key={story.id}
                variants={fadeUp}
                className="surface-card p-5 cursor-pointer group relative overflow-hidden"
                onClick={() => navigate(`/story/${story.id}`)}
              >
                <div className="accent-line-top bg-gradient-to-r from-section-dashboard/25 via-transparent to-transparent" />
                <div className="flex items-center justify-between mb-3">
                  <span className={sentimentBadge(story.sentiment)}>{story.sentiment}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    {trendIcon(story.trend)}
                    <span>{story.updatedAt}</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors duration-250 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{story.summary}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {story.sources.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30 text-[11px] text-muted-foreground">
                  <span className="font-mono">{story.articleCount} articles</span>
                  <span>{story.narrativeCount} narratives</span>
                  {story.contradictions > 0 && (
                    <span className="flex items-center gap-1 text-destructive">
                      <AlertTriangle className="w-3 h-3" />
                      {story.contradictions}
                    </span>
