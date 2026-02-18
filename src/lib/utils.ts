import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/** Ensure URL is absolute (has protocol). Used so iframes load the real domain, not same-origin. */
function ensureAbsoluteUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function convertMediaUrl(url: string | null | undefined): string {
  if (!url) return ''

  const absolute = ensureAbsoluteUrl(url)

  // Handle YouTube URLs
  const youtubeMatch = absolute.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
  }

  // Handle Google Drive URLs
  const fileIdMatch = absolute.match(/\/d\/([^/]+)/) || absolute.match(/id=([^&]+)/)
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`
  }

  // Web / other URLs: return absolute so iframe loads the actual domain
  return absolute
}
