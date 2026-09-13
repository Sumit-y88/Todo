export default function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bru-card rounded-lg p-5 flex items-start gap-4"
        >
          {/* Checkbox placeholder */}
          <div className="w-9 h-9 rounded-full animate-shimmer shrink-0 mt-0.5" />

          <div className="flex-1 space-y-2.5">
            {/* Title */}
            <div className="h-4 w-3/4 rounded animate-shimmer" />
            {/* Description */}
            <div className="h-3.5 w-1/2 rounded animate-shimmer" />
            {/* Timestamp */}
            <div className="h-3 w-24 rounded animate-shimmer" />
          </div>

          {/* Action buttons placeholder */}
          <div className="flex gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg animate-shimmer" />
            <div className="w-10 h-10 rounded-lg animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}