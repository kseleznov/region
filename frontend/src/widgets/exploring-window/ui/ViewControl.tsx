interface ViewControlProps {
  currentCount: number;
  totalCount: number;
}

export function ViewControl({ currentCount, totalCount }: ViewControlProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-dark">
        {currentCount} / {totalCount}
      </span>
    </div>
  );
}
