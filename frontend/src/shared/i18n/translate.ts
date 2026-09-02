import type { Dictionary } from "./dictionaries";

/**
 * Every dot-path that leads to a string in the dictionary, e.g.
 * `"profile.title"` or `"card.openUntil"`. Gives `t()` autocomplete and
 * catches typos at compile time.
 */
export type TranslationKey = DottedLeafKeys<Dictionary>;

type DottedLeafKeys<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : `${K}.${DottedLeafKeys<T[K]>}`;
}[keyof T & string];

export type TranslationVars = Record<string, string | number>;

/**
 * Resolve `key` against `dict` and fill `{placeholders}` from `vars`.
 * A missing key returns the key itself, so a gap is visible, not a crash.
 */
export function translate(
  dict: Dictionary,
  key: TranslationKey,
  vars?: TranslationVars,
): string {
  const raw = key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[part]
          : undefined,
      dict,
    );

  if (typeof raw !== "string") {
    return key;
  }

  if (!vars) {
    return raw;
  }

  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}
