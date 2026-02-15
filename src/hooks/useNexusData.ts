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
