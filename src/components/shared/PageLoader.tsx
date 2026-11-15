export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F7FAFF] px-4"
    >
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-[#DCE9FB] border-t-[#1670F5]"
        />
        <span className="font-montserrat text-[10px] font-black tracking-tight text-[#10234B]">
          MT
        </span>
      </span>
      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-[#526987]">
        Loading
      </span>
    </div>
  );
}
