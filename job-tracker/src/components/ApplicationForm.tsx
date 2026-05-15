'use client';

import { useState, useEffect } from 'react';
import { Application, Status } from '@/lib/types';

interface ApplicationFormProps {
  onSubmit: (app: Application) => void;
  initial?: Application | null;
  onClose: () => void;
}

const inputClass = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm";
const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

export default function ApplicationForm({ onSubmit, initial, onClose }: ApplicationFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('Remote');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<Status>('need-to-apply');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initial) {
      setCompanyName(initial.companyName);
      setJobRole(initial.jobRole);
      setLink(initial.link);
      setLocation(initial.location);
      setDateApplied(initial.dateApplied);
      setSource(initial.source);
      setStatus(initial.status);
      setNotes(initial.notes);
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      companyName,
      jobRole,
      link,
      location,
      dateApplied,
      source,
      status,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-slate-900">{initial ? 'Edit Application' : 'New Application'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none transition-colors">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Google"
              />
            </div>
            <div>
              <label className={labelClass}>Job Role *</label>
              <input
                type="text"
                required
                value={jobRole}
                onChange={e => setJobRole(e.target.value)}
                className={inputClass}
                placeholder="e.g. SDE Intern"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Job Link</label>
            <input
              type="url"
              value={link}
              onChange={e => setLink(e.target.value)}
              className={inputClass}
              placeholder="https://company.com/careers/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className={inputClass}
              >
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date Applied</label>
              <input
                type="date"
                value={dateApplied}
                onChange={e => setDateApplied(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Source</label>
            <input
              type="text"
              value={source}
              onChange={e => setSource(e.target.value)}
              className={inputClass}
              placeholder="LinkedIn, Referral, Company site..."
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Status)}
              className={inputClass}
            >
              <option value="need-to-apply">Need to Apply</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Interview dates, follow-up reminders, feedback..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition-colors shadow-sm"
            >
              {initial ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
