'use client';

import { Application, Status } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2, Briefcase } from 'lucide-react';

const statusConfig: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  'need-to-apply': { label: 'Need to Apply', dot: 'bg-gray-400', bg: 'bg-gray-50', text: 'text-gray-700' },
  'applied': { label: 'Applied', dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  'interview': { label: 'Interview', dot: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  'rejected': { label: 'Rejected', dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  'offer': { label: 'Offer', dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
};

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

export default function ApplicationTable({ applications, onEdit, onDelete }: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-16">
        <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-400" />
        <p className="text-lg font-semibold text-slate-900">No applications yet</p>
        <p className="text-sm text-slate-500 mt-1">Click "Add Application" to start tracking</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[22%] font-semibold text-sm text-slate-600">Company</TableHead>
          <TableHead className="w-[16%] font-semibold text-sm text-slate-600">Role</TableHead>
          <TableHead className="w-[12%] font-semibold text-sm text-slate-600 hidden md:table-cell">Location</TableHead>
          <TableHead className="w-[12%] font-semibold text-sm text-slate-600 hidden sm:table-cell">Date</TableHead>
          <TableHead className="w-[18%] font-semibold text-sm text-slate-600 hidden lg:table-cell">Source</TableHead>
          <TableHead className="w-[12%] font-semibold text-sm text-slate-600">Status</TableHead>
          <TableHead className="w-[8%] text-right font-semibold text-sm text-slate-600">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map(app => {
          const config = statusConfig[app.status];
          return (
            <TableRow key={app.id} className="hover:bg-slate-50/50">
              <TableCell>
                <div className="font-semibold text-sm text-slate-900">{app.companyName}</div>
                {app.link && (
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-indigo-600 hover:underline truncate block mt-0.5 max-w-[200px]">
                    View posting →
                  </a>
                )}
              </TableCell>
              <TableCell className="text-sm text-slate-600">{app.jobRole}</TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                  {app.location === 'Remote' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  {app.location === 'Hybrid' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                  {app.location === 'On-site' && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                  {app.location}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm text-slate-500 font-mono">{app.dateApplied}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="text-sm text-slate-500 truncate max-w-[180px]" title={app.source}>
                  {app.source || '—'}
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  {config.label}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-0.5 justify-end">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => onEdit(app)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(app.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
