import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
// We fallback to mock data for heatmap/trending/timeline if the API doesn't have it yet

const API_BASE = 'http://localhost:3000/api';

const fetcher = async (url: string) => {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error('API fetch failed');
  return res.json();
};

export const useStoryClusters = () => {
  const [searchParams] = useSearchParams();
  const time = searchParams.get('time') || '';
  const source = searchParams.get('source') || '';
  
  return useQuery({
    queryKey: ['storyClusters', time, source],
    queryFn: () => fetcher(`/stories?time=${time}&source=${source}`),
  });
};

export const useStoryDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['storyDetail', id],
    queryFn: () => fetcher(`/stories/${id}`),
    enabled: !!id,
  });
};

export const useStoryNarratives = (id: string | undefined) => {
  return useQuery({
    queryKey: ['storyNarratives', id],
    queryFn: () => fetcher(`/stories/${id}/narratives`),
    enabled: !!id,
  });
};

export const useStoryContradictions = (id: string | undefined) => {
  return useQuery({
    queryKey: ['storyContradictions', id],
    queryFn: () => fetcher(`/stories/${id}/contradictions`),
    enabled: !!id,
  });
};

export const useStoryArticles = (id: string | undefined) => {
  return useQuery({
    queryKey: ['storyArticles', id],
    queryFn: () => fetcher(`/stories/${id}/articles`),
    enabled: !!id,
  });
};

export const useAllNarratives = () => {
  return useQuery({
    queryKey: ['allNarratives'],
    queryFn: () => fetcher('/narratives'),
  });
};

export const useAllContradictions = () => {
  return useQuery({
    queryKey: ['allContradictions'],
    queryFn: () => fetcher('/contradictions'),
  });
};

// Compute mock data dynamically based on the current stories from API
export const useStaticData = () => {
    const { data: storyClusters = [] } = useStoryClusters();
    
    // Dynamically build trending topics based on actual cluster titles
    const trendingTopics = storyClusters.slice(0, 6).map((s: any) => ({
      name: s.title,
      category: s.category,
      // FIX: was always returning 840 due to broken ternary.
      // articleCount is always truthy when > 0, so the ternary was always "840"
      count: s.articleCount * 12 || 120,
      change: (s.contradictions || 1) * 5 + 4
    }));

    // Build dynamic timeline from last 7 days using today's actual date
    const today = new Date();
    const timelineData = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      // Distribute article counts across the week from the DB stories
      const idx = i % (storyClusters.length || 1);
      const cluster = storyClusters[idx] as any;
      return {
        date: label,
        articles: cluster ? cluster.articleCount : 5 + Math.floor(Math.random() * 10),
        contradictions: cluster ? cluster.contradictions : Math.floor(Math.random() * 3),
        ...(i === 3 ? { label: storyClusters[0]?.title?.slice(0, 20) || 'Key Event' } : {})
      };
    });
    
    // Geopolitics-aware heatmap with real region positions on the world map SVG (700x340)
    const regionMap: Record<string, { x: number; y: number }> = {
      'GEOPOLITICS': { x: 350, y: 100 },
      'MIDDLE EAST': { x: 420, y: 170 },
      'SOUTH ASIA': { x: 500, y: 180 },
      'EUROPE': { x: 340, y: 90 },
      'EAST ASIA': { x: 560, y: 140 },
      'AMERICAS': { x: 150, y: 140 },
      'AFRICA': { x: 360, y: 220 },
      'ECONOMY & POLITICS': { x: 220, y: 130 },
      'DEFAULT': { x: 350, y: 170 },
    };

    const heatmapData = storyClusters.slice(0, 7).map((s: any, i: number) => {
      const catKey = (s.category || 'DEFAULT').toUpperCase();
      const pos = regionMap[catKey] || regionMap['DEFAULT'];
      // Spread overlapping regions slightly
      const offset = i * 20;
      return {
        region: s.title?.slice(0, 18) || s.category,
        x: Math.min(Math.max(pos.x + (i % 3) * offset, 60), 640),
        y: Math.min(Math.max(pos.y + (i % 2) * 30, 40), 300),
        intensity: Math.min(0.3 + (s.articleCount / 100), 1.0),
        articles: s.articleCount * 10,
      };
    });

    return { heatmapData, trendingTopics, timelineData };
};

export const useSearch = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const res = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },
  });
};

// [Stage 25% | Commit 16 | 2026-03-24 23:33]

// [Stage 50% | Commit 24 | 2026-03-24 23:33]

// [Stage 75% | Commit 30 | 2026-03-24 23:33]

// [Stage 100% | Commit 38 | 2026-03-24 23:34]
