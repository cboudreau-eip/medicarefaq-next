/**
 * Central author registry.
 * Add a photo URL here to display an avatar next to the author's name in bylines.
 * Photos are referenced by the author's display name (must match exactly).
 */
export const AUTHOR_PHOTOS: Record<string, string> = {
  "David Haass":
    "https://eliteinsurancepartners.com/wp-content/uploads/2023/06/David-Haass-768x512.jpg",
  "Jagger Esch":
    "https://eliteinsurancepartners.com/wp-content/uploads/2023/02/Jagger-Esch-12-2023-1200-800-768x512.jpg",
  "Ashlee Zareczny":
    "https://eliteinsurancepartners.com/wp-content/uploads/2023/06/Ashlee-Zareczny-1-768x512.jpg",
};

/** Returns the photo URL for a given author name, or undefined if not set. */
export function getAuthorPhoto(name: string): string | undefined {
  return AUTHOR_PHOTOS[name];
}
