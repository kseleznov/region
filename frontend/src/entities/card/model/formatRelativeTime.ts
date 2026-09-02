const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

/** ISO timestamp → "2 weeks ago" / "2 недели назад", in the given locale. */
export function formatRelativeTime(iso: string, locale = "en"): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  let duration = (new Date(iso).getTime() - Date.now()) / 1000;

  for (const { amount, unit } of DIVISIONS) {
    if (Math.abs(duration) < amount) {
      return rtf.format(Math.round(duration), unit);
    }
    duration /= amount;
  }

  return rtf.format(Math.round(duration), "year");
}
