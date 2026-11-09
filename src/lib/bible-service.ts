import { type TranslationCode } from '@/data/translations-metadata'
import { BIBLE_BOOKS } from '@/data/bible-metadata'

export interface RawBibleBook {
  abbrev: string
  name: string
  chapters: (string | string[])[][]
}

export interface SearchResult {
  bookId: number
  bookName: string
  chapter: number
  verse: number
  text: string
}

const translationCache = new Map<TranslationCode, RawBibleBook[]>()

const translationLoaders: Record<
  TranslationCode,
  () => Promise<{ default: RawBibleBook[] }>
> = {
  nvi: () => import('@/data/translations/nvi.json') as Promise<{ default: RawBibleBook[] }>,
  acf: () => import('@/data/translations/acf.json') as Promise<{ default: RawBibleBook[] }>,
  ntlh: () => import('@/data/translations/ntlh.json') as Promise<{ default: RawBibleBook[] }>,
}

export async function loadTranslation(code: TranslationCode): Promise<RawBibleBook[]> {
  const cached = translationCache.get(code)
  if (cached) {
    return cached
  }

  const loader = translationLoaders[code]
  if (loader) {
    try {
      const module = await loader()
      const data = module.default
      translationCache.set(code, data)
      return data
    } catch {
      // fallback
    }
  }

  const response = await fetch(`/data/translations/${code}.json`)
  if (!response.ok) {
    throw new Error(`Falha ao carregar tradução ${code}`)
  }

  const data: RawBibleBook[] = await response.json()
  translationCache.set(code, data)
  return data
}

export async function getChapterVerses(
  translation: TranslationCode,
  bookId: number,
  chapter: number
): Promise<string[]> {
  const data = await loadTranslation(translation)
  const bookIndex = bookId - 1
  if (bookIndex < 0 || bookIndex >= data.length) {
    return []
  }

  const book = data[bookIndex]
  const chapterIndex = chapter - 1
  if (chapterIndex < 0 || chapterIndex >= book.chapters.length) {
    return []
  }

  const rawVerses = book.chapters[chapterIndex] || []
  return rawVerses.map((v) => (Array.isArray(v) ? v.join(' ') : String(v)))
}

export async function searchBible(
  translation: TranslationCode,
  query: string,
  limit = 50
): Promise<SearchResult[]> {
  const cleanQuery = query.trim().toLowerCase()
  if (!cleanQuery) return []

  const data = await loadTranslation(translation)
  const results: SearchResult[] = []

  for (let bookIndex = 0; bookIndex < data.length; bookIndex++) {
    const book = data[bookIndex]
    const bookMeta = BIBLE_BOOKS[bookIndex]

    for (let cIndex = 0; cIndex < book.chapters.length; cIndex++) {
      const verses = book.chapters[cIndex]
      for (let vIndex = 0; vIndex < verses.length; vIndex++) {
        const rawVerse = verses[vIndex]
        const text = Array.isArray(rawVerse) ? rawVerse.join(' ') : String(rawVerse)
        if (text.toLowerCase().includes(cleanQuery)) {
          results.push({
            bookId: bookMeta?.id ?? bookIndex + 1,
            bookName: bookMeta?.name ?? book.name,
            chapter: cIndex + 1,
            verse: vIndex + 1,
            text,
          })

          if (results.length >= limit) {
            return results
          }
        }
      }
    }
  }

  return results
}
