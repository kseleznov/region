import {
  Award,
  Camera,
  Clock,
  CreditCard,
  Footprints,
  Info,
  MapPin,
  Shirt,
  Ticket,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/shared/i18n";
import type { Expectation } from "@/shared/types/card";

const EXPECTATION_ICONS: Record<string, LucideIcon> = {
  ticket: Ticket,
  clock: Clock,
  camera: Camera,
  footprints: Footprints,
  award: Award,
  wine: Wine,
  card: CreditCard,
  shirt: Shirt,
  utensils: Utensils,
  map: MapPin,
};

interface CardExpectationsProps {
  items: Expectation[];
}

export function CardExpectations({ items }: CardExpectationsProps) {
  const { t } = useTranslation();

  return (
    <section className="mb-8">
      <h3 className="text-xs font-bold text-dark/50 uppercase tracking-wider mb-3 px-1">
        {t("card.whatToExpect")}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon, label, note }) => {
          const Icon = EXPECTATION_ICONS[icon] ?? Info;

          return (
            <div
              key={label}
              className="flex items-center gap-3 bg-dark/[0.03] rounded-2xl p-3"
            >
              <div className="w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-dark" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-dark leading-tight">
                  {label}
                </p>
                {note && (
                  <p className="text-xs text-dark/50 font-medium">{note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
