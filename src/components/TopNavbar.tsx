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
