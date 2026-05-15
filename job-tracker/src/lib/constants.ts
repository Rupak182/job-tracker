export const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  'need-to-apply': { label: 'Need to Apply', dot: 'bg-gray-400', bg: 'bg-gray-50 text-gray-700 border-gray-200' },
  'applied': { label: 'Applied', dot: 'bg-blue-500', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  'interview': { label: 'Interview', dot: 'bg-violet-500', bg: 'bg-violet-50 text-violet-700 border-violet-200' },
  'rejected': { label: 'Rejected', dot: 'bg-red-500', bg: 'bg-red-50 text-red-700 border-red-200' },
  'offer': { label: 'Offer', dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};
