const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) {
    return image;
  }
  return `${API_BASE}${image}`;
}
