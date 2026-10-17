import { database } from '../../../../lib/server/firebase';
import { requireAdmin, adminError } from '../../../../lib/server/adminAccess';
export async function GET(request) {
  try {
    const user = await requireAdmin(request); const store = database(); const counts = {};
    if (['owner', 'editor'].includes(user.role)) {
      const [projects, categories] = await Promise.all([store.collection('portfolioProjects').count().get(), store.collection('portfolioCategories').count().get()]);
      counts.projects = projects.data().count; counts.categories = categories.data().count;
    }
    if (['owner', 'support'].includes(user.role)) {
      const [all, unread] = await Promise.all([store.collection('submissions').count().get(), store.collection('submissions').where('status', '==', 'new').count().get()]);
      counts.submissions = all.data().count; counts.newSubmissions = unread.data().count;
    }
    return Response.json(counts, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return adminError(error); }
}
