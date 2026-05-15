'use client';

import { Application, Status } from '@/lib/types';
import StatusBadge from './StatusBadge';
import { statusConfig } from '@/lib/constants';

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

export default function ApplicationTable({ applications, onEdit, onDelete, onStatusChange }: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-900 font-semibold text-lg">No applications yet</p>
        <p className="text-slate-500 text-sm mt-1">Click "Add Application" to start tracking</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Company</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Role</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Location</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Source</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {applications.map(app => (
            <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5">
                <div className="font-semibold text-slate-900">{app.companyName}</div>
                {app.link && (
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline truncate block max-w-[180px] mt-0.5">
                    View posting →
                  </a>
                )}
              </td>
              <td className="py-3.5 text-slate-600">{app.jobRole}</td>
              <td className="py-3.5 text-slate-600 hidden md:table-cell">
                <span className="inline-flex items-center gap-1.5">
                  {app.location === 'Remote' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  {app.location === 'Hybrid' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  {app.location === 'On-site' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  {app.location}
                </span>
              </td>
              <td className="py-3.5 text-slate-500 hidden sm:table-cell font-mono text-xs">{app.dateApplied}</td>
              <td className="py-3.5 text-slate-500 hidden lg:table-cell text-xs">{app.source || '—'}</td>
              <td className="py-3.5">
                <select
                  value={app.status}
                  onChange={e => onStatusChange(app.id, e.target.value as Status)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer appearance-none pr-6 bg-no-repeat ${statusConfig[app.status].bg}`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.25rem center', backgroundSize: '1.25em 1.25em' }}
                >
                  <option value="need-to-apply">Need to Apply</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
              </td>
              <td className="py-3.5 text-right">
                <div className="flex gap-1 justify-end">
                  <button onClick={() => onEdit(app)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => onDelete(app.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
