import nextEnv from '@next/env';
import { database } from '../src/lib/server/firebase.js';
import { portfolioCategories, portfolioProjects } from '../src/data/portfolioProjectsData.js';
import { homeProjectsData } from '../src/data/homeProjectsData.js';

nextEnv.loadEnvConfig(process.cwd());
const store = database();
const records = [
  ...portfolioCategories.map((item, index) => ['portfolioCategories', item.id, { label: item.label, sortOrder: index }]),
  ...portfolioProjects.map((item, index) => ['portfolioProjects', `legacy-${item.id}`, { title: item.title, category: item.category, image: item.image, liveUrl: item.liveUrl || '', number: item.number || '', placement: 'portfolio', status: 'published', sortOrder: index, tags: [], description: '' }]),
  ...homeProjectsData.map((item, index) => ['portfolioProjects', `home-${item.id}`, { title: item.title, category: [], image: item.image, liveUrl: '', placement: 'home', status: 'published', sortOrder: index, tags: item.tags, description: item.description }]),
];
let created = 0;
// Transactions make repeat runs safe without replacing dashboard edits.
for (const [collection, id, data] of records) {
  await store.runTransaction(async tx => {
    const ref = store.collection(collection).doc(id);
    if (!(await tx.get(ref)).exists) { tx.create(ref, { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }); created++; }
  });
}
console.log(JSON.stringify({ created, categories: portfolioCategories.length, portfolioProjects: portfolioProjects.length, homeProjects: homeProjectsData.length }));
await store.terminate();
