import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, TrendingUp, Network, Swords, Clock, Lightbulb,
  Search, Settings, ChevronLeft, ChevronRight, Newspaper
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Trending Topics", path: "/trending", icon: TrendingUp },
  { label: "Narrative Explorer", path: "/narratives", icon: Network },
  { label: "Contradiction Map", path: "/contradictions", icon: Swords },
  { label: "Timeline View", path: "/timeline", icon: Clock },
  { label: "Impact Insights", path: "/insights", icon: Lightbulb },
  { label: "Search / Query", path: "/search", icon: Search },
];

const bottomItems = [
  { label: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      className="h-full flex flex-col border-r border-border/40 bg-sidebar shrink-0 relative z-20"
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border/30">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-md bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
            <Newspaper className="w-4 h-4 text-primary" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-semibold text-base tracking-tight text-foreground whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Infera
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`sidebar-item relative ${isActive ? "sidebar-item-active" : ""}`}
                whileTap={{ scale: 0.98 }}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-[17px] h-[17px] shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      className="whitespace-nowrap text-[13px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-3 px-2 border-t border-border/30 space-y-0.5">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`sidebar-item relative ${isActive ? "sidebar-item-active" : ""}`} title={collapsed ? item.label : undefined}>
                <item.icon className="w-[17px] h-[17px] shrink-0" />
                {!collapsed && <span className="whitespace-nowrap text-[13px]">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-5 h-5 rounded-full bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-30"
      >
        {collapsed ? <ChevronRight className="w-2.5 h-2.5" /> : <ChevronLeft className="w-2.5 h-2.5" />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;

// [Stage 25% | Commit 5 | 2026-03-24 23:33]

// [Stage 50% | Commit 19 | 2026-03-24 23:33]

// [Stage 75% | Commit 31 | 2026-03-24 23:33]

// [Stage 100% | Commit 43 | 2026-03-24 23:34]
