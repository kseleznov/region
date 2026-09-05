import type { FollowedUser } from "./types";

/**
 * Placeholder data for the account-settings UI mockup — bio, username and
 * followers/following have no backend yet, so this stands in until that
 * lands.
 */
export const MOCK_BIO =
  "Собираю места, куда вожу друзей: виды, кофе и старые трамваи.";

export const MOCK_FOLLOWERS: FollowedUser[] = [
  { id: "f1", username: "hannah.w", name: "Hannah Weber" },
  { id: "f2", username: "david_oc", name: "David O'Connor" },
  { id: "f3", username: "sarah.j", name: "Sarah Jenkins" },
];

export const MOCK_FOLLOWING: FollowedUser[] = [
  { id: "g1", username: "lisbon_locals", name: "Lisbon Locals" },
  { id: "g2", username: "paris_by_foot", name: "Paris by Foot" },
];
