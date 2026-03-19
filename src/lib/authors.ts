export interface AuthorProfile {
  name: string
  role: string
  bio: string
}

const authorProfiles: Record<string, AuthorProfile> = {
  "Jacques FLA": {
    name: "Jacques FLA",
    role: "Comparisons & Research",
    bio: "Writes comparison and buyer-guide content focused on transparent Mac maintenance tools, pricing, and cleanup safety.",
  },
  "PB CO": {
    name: "PB CO",
    role: "Product Commentary",
    bio: "Covers product direction, workflow design, and the practical tradeoffs behind modern Mac cleaner apps.",
  },
  "DiskCleaner Team": {
    name: "DiskCleaner Team",
    role: "Editorial Team",
    bio: "Publishes product explainers, help content, and update notes for DiskCleaner.",
  },
}

export function getAuthorProfile(name: string): AuthorProfile {
  return authorProfiles[name] || {
    name,
    role: "Contributor",
    bio: "Contributes to DiskCleaner editorial content.",
  }
}
