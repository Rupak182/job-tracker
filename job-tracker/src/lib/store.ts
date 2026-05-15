import { Application } from './types';

const STORAGE_KEY = 'job-applications';

export function getApplications(): Application[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveApplication(app: Application): void {
  const apps = getApplications();
  apps.push(app);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function updateApplication(updated: Application): void {
  const apps = getApplications();
  const index = apps.findIndex(a => a.id === updated.id);
  if (index !== -1) {
    apps[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }
}

export function deleteApplication(id: string): void {
  const apps = getApplications();
  const filtered = apps.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
