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
              </span>
            )}
            <span>Updated {story.updatedAt}</span>
          </div>
          <div className="section-divider" />
        </motion.div>

        {/* Narratives */}
        {storyNarratives.length > 0 && (
          <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.25 }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Narratives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {storyNarratives.map((n, i) => {
                const barColor = n.sentiment === "positive" ? "bg-success" : n.sentiment === "negative" ? "bg-destructive" : "bg-primary";
                return (
                  <motion.div
                    key={n.id}
                    className="surface-card p-4"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-0.5 self-stretch rounded-full ${barColor}`} />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1">{n.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{n.summary}</p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="font-mono">{(n.confidence * 100).toFixed(0)}%</span>
                          <span>{n.sources.length} sources</span>
                          <span>{n.articleCount} articles</span>
                        </div>
                        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${barColor}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${n.confidence * 100}%` }}
                            transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Contradictions */}
        {storyContradictions.length > 0 && (
          <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.25 }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Contradictions</h2>
            <p className="text-[11px] text-muted-foreground mb-4">Conflicting claims detected by AI</p>
            <div className="space-y-3">
              {storyContradictions.map((c, i) => (
                <motion.div
                  key={c.id}
                  className="surface-card p-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.04, duration: 0.25 }}
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
                    <div>
                      <span className="badge-positive mb-2 inline-block">Claim A</span>
                      <p className="text-sm">"{c.claimA.text}"</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {c.claimA.sources.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center pt-4">
                      <div className="w-9 h-9 rounded-full border border-destructive/30 flex items-center justify-center">
                        <span className="text-[11px] font-semibold font-mono text-destructive">{c.score}</span>
                      </div>
                    </div>
                    <div>
                      <span className="badge-negative mb-2 inline-block">Claim B</span>
                      <p className="text-sm">"{c.claimB.text}"</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {c.claimB.sources.map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                    <Zap className="w-3 h-3 inline mr-1 text-primary" />
                    {c.explanation}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Impact */}
        {impact && (
          <motion.div className="surface-card overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.25 }}>
            <div className="p-5 border-b border-border/30">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Impact Analysis</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {[
                { icon: Globe, title: "Why It Matters", text: impact.whyItMatters, color: "text-primary" },
                { icon: DollarSign, title: "Who Is Affected", text: impact.whoIsAffected, color: "text-warning" },
                { icon: Eye, title: "Future Outlook", text: impact.futureOutlook, color: "text-accent" },
              ].map((s) => (
                <div key={s.title} className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                    <span className="text-sm font-medium">{s.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Articles */}
        <motion.div className="surface-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.25 }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Related Articles</h2>
          <div className="space-y-1.5">
            {storyArticles.map((article, i) => {
              const barColor = article.sentiment === "positive" ? "bg-success" : article.sentiment === "negative" ? "bg-destructive" : "bg-primary";
              return (
                <motion.div
                  key={article.id}
                  className="surface-card p-3.5 flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + i * 0.03, duration: 0.25 }}
                >
                  <div className={`w-0.5 self-stretch rounded-full ${barColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-0.5">
                      <span className="font-medium">{article.source}</span>
                      <span>Â·</span>
                      <span>{article.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">{article.headline}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{article.summary}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default StoryDetailPage;

// [Stage 25% | Commit 26 | 2026-03-24 23:33]

// [Stage 50% | Commit 29 | 2026-03-24 23:33]

// [Stage 75% | Commit 36 | 2026-03-24 23:34]

// [Stage 100% | Commit 39 | 2026-03-24 23:34]
