import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useStoryClusters, useStoryNarratives, useStoryContradictions, useStoryArticles } from "@/hooks/useNexusData";
import { ArrowLeft, AlertTriangle, ExternalLink, Zap, Globe, DollarSign, Eye } from "lucide-react";

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: storyClusters = [] } = useStoryClusters();
  const story = storyClusters.find((s: any) => s.id === id);
  
  const { data: storyNarratives = [] } = useStoryNarratives(id || "");
  const { data: storyContradictions = [] } = useStoryContradictions(id || "");
  const { data: storyArticles = [] } = useStoryArticles(id || "");
  
  const impact = {
    whyItMatters: "This fundamentally alters the landscape: " + (story?.summary?.slice(0, 60) || "") + "..., indicating major structural shifts.",
    whoIsAffected: "Global markets, policymakers, and consumers engaged with " + (story?.category || "this sector") + ".",
    futureOutlook: "Expect heightened volatility and regulatory scrutiny as the situation continues to evolve rapidly in the coming months.",
  };

  if (!story) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full text-muted-foreground">Story not found</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-[1100px] mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-xl font-semibold tracking-tight mb-2">{story.title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{story.summary}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {story.entities.map((e) => (
              <span key={e} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">{e}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
            <span className="font-mono">{story.articleCount} articles</span>
            <span>{story.narrativeCount} narratives</span>
            {story.contradictions > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertTriangle className="w-3 h-3" />
                {story.contradictions} contradictions
