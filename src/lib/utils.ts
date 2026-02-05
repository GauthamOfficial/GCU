import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function convertMediaUrl(url: string | null | undefined): string {
  if (!url) return ''

  // Handle YouTube URLs
  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
  }

  // Handle Google Drive URLs
  const fileIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/)
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`
  }

  return url
}
