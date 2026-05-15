'use client';

import { useState, useEffect } from 'react';
import { Application, Status } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (app: Application) => void;
  initial?: Application | null;
}

const statusOptions: { value: Status; label: string }[] = [
  { value: 'need-to-apply', label: 'Need to Apply' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'offer', label: 'Offer' },
];

export default function ApplicationForm({ open, onOpenChange, onSubmit, initial }: ApplicationFormProps) {
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
    } else {
      setCompanyName('');
      setJobRole('');
      setLink('');
      setLocation('Remote');
      setDateApplied(new Date().toISOString().split('T')[0]);
      setSource('');
      setStatus('need-to-apply');
      setNotes('');
    }
  }, [initial, open]);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg">{initial ? 'Edit Application' : 'New Application'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Google"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Job Role</Label>
              <Input
                id="role"
                required
                value={jobRole}
                onChange={e => setJobRole(e.target.value)}
                placeholder="e.g. SDE Intern"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Job Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="https://company.com/careers/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={location} onValueChange={(v) => v && setLocation(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Applied</Label>
              <Input
                id="date"
                type="date"
                value={dateApplied}
                onChange={e => setDateApplied(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="LinkedIn, Referral, Company site..."
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => v && setStatus(v as Status)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Interview dates, follow-up reminders, feedback..."
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              {initial ? 'Save Changes' : 'Add Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
