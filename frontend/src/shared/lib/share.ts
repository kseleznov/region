interface ShareContentInput {
  title: string;
  text: string;
  url: string;
}

/**
 * Opens the OS share sheet via the Web Share API, falling back to copying
 * "text\nurl" to the clipboard on browsers that don't support it (desktop
 * Safari/Firefox, most non-mobile browsers).
 */
export async function shareContent({ title, text, url }: ShareContentInput) {
  if (typeof window === "undefined") return;

  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${url}`);
    }
  } catch {
    // Share sheet dismissed or unavailable — nothing to do.
  }
}
