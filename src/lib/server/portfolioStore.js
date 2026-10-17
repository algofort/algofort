import { database } from './firebase.js';

export async function readPortfolio(includeDrafts = false) {
  const store = database();
  const [projects, categories] = await Promise.all([
    (includeDrafts ? store.collection('portfolioProjects') : store.collection('portfolioProjects').where('status', '==', 'published')).get(),
    store.collection('portfolioCategories').get(),
  ]);
  const sorted = projects.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a,b) => a.sortOrder - b.sortOrder);
  return {
    projects: sorted.filter(item => item.placement !== 'home'),
    homeProjects: sorted.filter(item => item.placement === 'home'),
    categories: categories.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a,b) => a.sortOrder - b.sortOrder),
  };
}
export function publicPortfolio(data) {
  const visible = project => ({ id: project.id, title: project.title, category: project.category || [], image: project.image, liveUrl: project.liveUrl, description: project.description || '', tags: project.tags || [], number: project.number || String(project.sortOrder + 1).padStart(2, '0'), buttons: [{ text: 'Live Preview', href: project.liveUrl || '/contact' }, { text: 'Get In Touch', href: '/contact' }] });
  return { projects: data.projects.map(visible), homeProjects: data.homeProjects.map(visible), categories: data.categories.map(({ id, label }) => ({ id, label })) };
}
