'use client';

import { useState, useEffect, useCallback } from 'react';
import { Application, Status } from '@/lib/types';
import { getApplications, saveApplication, updateApplication, deleteApplication } from '@/lib/store';
import ApplicationTable from '@/components/ApplicationTable';
import ApplicationForm from '@/components/ApplicationForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const filters: { key: Status | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'need-to-apply', label: 'To Apply' },
  { key: 'applied', label: 'Applied' },
  { key: 'interview', label: 'Interview' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'offer', label: 'Offer' },
];

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setApplications(getApplications());
    setMounted(true);
  }, []);

  const refresh = useCallback(() => {
    setApplications(getApplications());
  }, []);

  const handleSubmit = (app: Application) => {
    if (editing) {
      updateApplication(app);
    } else {
      saveApplication(app);
    }
    refresh();
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (app: Application) => {
    setEditing(app);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this application?')) {
      deleteApplication(id);
      refresh();
    }
  };

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);

  const counts: Record<string, number> = {
    all: applications.length,
    'need-to-apply': applications.filter(a => a.status === 'need-to-apply').length,
    applied: applications.filter(a => a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    offer: applications.filter(a => a.status === 'offer').length,
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Job Tracker</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track and manage your job applications</p>
          </div>
          <Button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {label}
              <span className={`text-xs ${filter === key ? 'text-indigo-200' : 'text-slate-400'}`}>
                {counts[key] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <ApplicationTable
            applications={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {applications.length > 0 && (
          <div className="mt-4 text-xs text-slate-500">
            Showing {filtered.length} of {applications.length} applications
          </div>
        )}
      </div>

      <ApplicationForm
        open={showForm}
        onOpenChange={setShowForm}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
