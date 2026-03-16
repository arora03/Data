import { Search, Sun, Moon, Bell, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const timeFilters = ["Today", "Week", "Month"];
const sourceFilters = ["All Sources", "Reuters", "Bloomberg", "BBC", "TechCrunch", "Wired", "The Verge"];

const TopNavbar = () => {
  const { theme, toggle } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTime = searchParams.get('time') || "Today";
  const activeSource = searchParams.get('source') || "All Sources";

  const handleTimeChange = (t: string) => {
    setSearchParams(prev => { prev.set('time', t); return prev; });
  };

  const handleSourceChange = (s: string) => {
    setSearchParams(prev => { prev.set('source', s); return prev; });
  };

  return (
    <header className="h-12 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center px-5 gap-4 sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Ask anything about global newsâ€¦"
            className="w-full h-8 pl-8 pr-4 rounded-md bg-muted/50 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-all duration-200"
          />
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex items-center bg-muted/50 rounded-md p-0.5 border border-border/30">
        {timeFilters.map((f) => (
          <button
            key={f}
            onClick={() => handleTimeChange(f)}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all duration-200 ${
              activeTime === f
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Source Filter */}
      <select
        value={activeSource}
        onChange={(e) => handleSourceChange(e.target.value)}
        className="h-7 px-2.5 text-[11px] rounded-md bg-muted/50 border border-border/30 text-foreground focus:outline-none cursor-pointer"
      >
        {sourceFilters.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggle}
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </motion.button>

      {/* Notifications */}
      <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative">
        <Bell className="w-3.5 h-3.5" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-destructive rounded-full" />
      </button>

      {/* Avatar */}
      <div className="w-7 h-7 rounded-md bg-muted border border-border/40 flex items-center justify-center">
        <User className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    </header>
  );
};

export default TopNavbar;

// [Stage 25% | Commit 13 | 2026-03-24 23:33]

// [Stage 50% | Commit 25 | 2026-03-24 23:33]

// [Stage 75% | Commit 34 | 2026-03-24 23:34]

// [Stage 100% | Commit 41 | 2026-03-24 23:34]
