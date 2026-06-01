export type ModalKey = "support" | "changelog" | "waitlist" | null

export function modalTitle(key: ModalKey): string {
  if (key === "support") return "Support"
  if (key === "changelog") return "Changelog"
  if (key === "waitlist") return "Join Waitlist"
  return ""
}
