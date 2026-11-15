import type { SubmissionStatus } from "../api/submissions";

const styles: Record<SubmissionStatus, string> = {
  new: "bg-[#EAF2FF] text-[#0B5BC4]",
  read: "bg-emerald-50 text-emerald-700",
  archived: "bg-slate-100 text-slate-600",
};

const labels: Record<SubmissionStatus, string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

export default function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-inter text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
