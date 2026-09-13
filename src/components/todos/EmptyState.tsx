export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Brutalist clipboard illustration */}
      <div className="relative w-44 h-44 mb-10">
        <div className="absolute inset-2 rotate-2 bg-bru-yellow border-[3px] border-bru-ink rounded-lg" />
        <div className="absolute inset-2 -rotate-2 bg-bru-purple border-[3px] border-bru-ink rounded-lg" />
        <div className="absolute inset-2 bg-bru-surface border-[3px] border-bru-ink rounded-lg shadow-[var(--shadow-bru)]">
          {/* Clip at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 rounded-md bg-bru-well border-2 border-bru-ink" />
          {/* Lines */}
          <div className="mt-9 mx-6 space-y-3.5">
            <div className="h-3 w-full rounded-sm border-2 border-bru-ink bg-bru-lime" />
            <div className="h-3 w-3/4 rounded-sm border-2 border-bru-ink bg-bru-blue" />
            <div className="h-3 w-1/2 rounded-sm border-2 border-bru-ink" />
          </div>
        </div>

        {/* Sticker pops */}
        <div className="absolute -top-2 -right-3 w-9 h-9 rounded-lg bg-bru-primary border-2 border-bru-ink rotate-12 shadow-[var(--shadow-bru-sm)]" />
        <div className="absolute -bottom-2 -left-3 w-8 h-8 rounded-full bg-bru-lime border-2 border-bru-ink -rotate-6 shadow-[var(--shadow-bru-sm)]" />
      </div>

      <h3 className="text-2xl font-bold text-bru-ink text-center tracking-tight">
        Nothing here yet!
      </h3>
      <p className="text-bru-muted font-medium text-center mt-2 max-w-xs">
        Your task list is looking a little empty.
        <br />
        Hit the{" "}
        <span className="text-bru-primary font-bold">New Task</span> button to
        get started.
      </p>
    </div>
  );
}