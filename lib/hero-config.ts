/**
 * Generic hero / landing copy. No hardcoded stats or region-specific claims.
 * Update these strings to match your product and data sources.
 */

export const heroConfig = {
  /** Assistant/product name shown in the hero */
  assistantName: "Atlas",
  /** Short tagline under the name */
  tagline: "Your AI Car Shopping Guide",

  /** Optional badge above the main headline (e.g. "AI Used Car Shopping Assistant") */
  badge: "AI Used Car Shopping Assistant",

  /** Main headline (first line) */
  headline: "Search All Used Cars",
  /** Headline second line (accent color) */
  headlineAccent: "In One Place.",

  /** Short description for mobile */
  descriptionShort:
    "Search verified used cars from multiple dealers in one simple chat.",
  /** Full description for desktop */
  descriptionFull:
    "Search verified used cars from multiple dealers — all in one conversation. No more jumping between websites. Just chat.",

  /** Optional stat shown on desktop (leave value empty to hide the stat block) */
  /** Feature bullets (desktop) */
  features: [
    {
      title: "Learns Your Preferences",
      description: "Gets smarter with every conversation",
    },
    {
      title: "Finds Local Deals",
      description: "Searches dealers in your city",
    },
  ],

  /** Optional social proof (leave null to hide) */
  socialProof: null as {
    label: string;
    sublabel: string;
    /** Optional initials for avatar stack, e.g. ["A", "R", "P", "S"] */
    avatarLetters?: string[];
  } | null,
} as const
