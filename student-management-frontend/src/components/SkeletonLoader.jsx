import { motion } from 'framer-motion';

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-4 border-b border-slate-100">
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-full h-32 flex flex-col justify-between">
      <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
      <div className="flex justify-between items-end">
        <div className="h-8 bg-slate-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-10 w-10 bg-slate-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
