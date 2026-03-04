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
