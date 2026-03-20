import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import { useState } from "react";
import { Send, Zap, Network, BarChart3, SearchIcon } from "lucide-react";
import { useSearch, useStoryClusters } from "@/hooks/useNexusData";

const SearchQueryPage = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: searchInsights, isPending } = useSearch();
  const { data: storyClusters = [] } = useStoryClusters();
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async () => {
    if (!query.trim() || isPending) return;
    try {
      const res = await searchInsights(query);
      setResponse(res);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setResponse({
        answer: "Failed to connect to the backend search API.",
        narratives: [], relatedStories: []
      });
      setSubmitted(true);
    }
  };

  return (
    <AppShell>
      <div className="section-search p-6 lg:p-8 max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <SearchIcon className="w-4 h-4 text-section-search" />
            <h1 className="text-xl font-semibold tracking-tight">Search & Query</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Ask questions and uncover insights across global news narratives.
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* Input */}
        <motion.div
          className="surface-card p-1.5 flex items-center gap-2 mb-8 focus-within:border-section-search/25 transition-all duration-250"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.25 }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Why is AI regulation trending?"
            className="flex-1 h-9 px-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <motion.button
            onClick={handleSubmit}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </motion.button>
        </motion.div>

        {/* Loading */}
        {isPending && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 rounded shimmer" style={{ width: `${90 - i * 15}%` }} />
            ))}
          </div>
        )}

        {/* Response */}
        {submitted && !isPending && response && (
          <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <motion.div
              className="surface-card p-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-section-search" />
                <span className="text-sm font-medium">AI Answer</span>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{response.answer}</p>
            </motion.div>

            <motion.div
              className="surface-card p-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-3.5 h-3.5 text-section-narrative" />
                <span className="text-sm font-medium">Related Narratives</span>
              </div>
              <div className="space-y-2">
                {response.narratives.map((n, i) => (
                  <motion.div
                    key={n}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/50"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.25 }}
                  >
                    <div className="w-0.5 h-7 rounded-full bg-section-narrative" />
                    <span className="text-sm">{n}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="surface-card p-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-3.5 h-3.5 text-success" />
                <span className="text-sm font-medium">Referenced Stories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {response.relatedStories.map((sid) => {
                  const story = storyClusters.find((s) => s.id === sid);
                  if (!story) return null;
                  return (
                    <div key={sid} className="p-3 rounded-md bg-muted/50">
                      <div className="text-sm font-medium mb-0.5">{story.title}</div>
                      <div className="text-[11px] text-muted-foreground">{story.articleCount} articles · {story.narrativeCount} narratives</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
};

export default SearchQueryPage;
