import { SearchX } from "lucide-react";

interface EmptyPlacesProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

/** Shown inside a category section when it has no places to display. */
export function EmptyPlaces({
  hasActiveFilters,
  onResetFilters,
}: EmptyPlacesProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-6 w-6 text-brand-gray" />
      </div>
      <p className="text-lg font-bold text-dark">
        {hasActiveFilters ? "Ничего не найдено" : "В этом разделе пока пусто"}
      </p>
      <p className="max-w-[280px] text-sm text-brand-gray">
        {hasActiveFilters
          ? "Под выбранные фильтры здесь ничего не подходит."
          : "Тут ещё нет мест — загляните в другие категории."}
      </p>
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="mt-1 rounded-full bg-dark px-5 py-2.5 text-sm font-bold text-white"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
}
