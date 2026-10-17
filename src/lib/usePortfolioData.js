'use client';
import { useEffect, useState } from 'react';
import { portfolioCategories, portfolioProjects } from '../data/portfolioProjectsData';
import { homeProjectsData } from '../data/homeProjectsData';

const fallback = { projects: portfolioProjects, categories: portfolioCategories, homeProjects: homeProjectsData };
export function usePortfolioData() {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/portfolio', { signal: controller.signal, cache: 'no-store' })
      .then(response => { if (!response.ok) throw Error(); return response.json(); })
      .then(result => { if (Array.isArray(result.projects) && Array.isArray(result.categories)) setData(result); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return data;
}
