export type Status = 'need-to-apply' | 'applied' | 'interview' | 'rejected' | 'offer';

export interface Application {
  id: string;
  companyName: string;
  jobRole: string;
  link: string;
  location: string;
  dateApplied: string;
  source: string;
  status: Status;
  notes: string;
}
