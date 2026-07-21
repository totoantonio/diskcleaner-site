export interface AuthorProfile {
  name: string
  role: string
  bio: string
}

const authorProfiles: Record<string, AuthorProfile> = {
  "Code: 22": {
    name: "Code: 22",
    role: "Technical Review",
    bio: "Reviews DiskCleaner articles for technical accuracy around macOS storage behavior, developer tooling artifacts, and cleanup safety.",
  },
  "J. Francois": {
    name: "J. Francois",
    role: "Editorial Review",
    bio: "Edits Mac utility and buyer-guide content with a focus on product positioning, category clarity, and evidence-backed comparisons.",
  },
  "Z. Seaver": {
    name: "Z. Seaver",
    role: "Research Editor",
    bio: "Contributes sourcing and editorial review for DiskCleaner articles covering macOS cleanup workflows, pricing models, and trust signals.",
  },
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
  "Thomas Antoni": {
    name: "Thomas Antoni",
    role: "Contributing Author",
    bio: "Contributes developer-focused cleanup guides for Xcode, iOS Simulator storage, and safe macOS maintenance workflows.",
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
