import { useState, useEffect } from 'react'
import { BIBLE_BOOKS, type BibleBookMetadata } from '@/data/bible-metadata'
import { type TranslationCode } from '@/data/translations-metadata'

const STORAGE_NAV_KEY = 'bible_reader_navigation'

export interface BibleNavigationState {
  bookId: number
  chapter: number
  translation: TranslationCode
}

const DEFAULT_NAV: BibleNavigationState = {
  bookId: 1,
  chapter: 1,
  translation: 'nvi',
}

export function useBibleNavigation() {
  const [nav, setNav] = useState<BibleNavigationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NAV_KEY)
      if (saved) {
        return { ...DEFAULT_NAV, ...JSON.parse(saved) }
      }
    } catch {
      return DEFAULT_NAV
    }
    return DEFAULT_NAV
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NAV_KEY, JSON.stringify(nav))
    } catch {
      // ignore
    }
  }, [nav])

  const currentBook: BibleBookMetadata =
    BIBLE_BOOKS.find((b) => b.id === nav.bookId) || BIBLE_BOOKS[0]

  const goToBookAndChapter = (bookId: number, chapter: number) => {
    const targetBook = BIBLE_BOOKS.find((b) => b.id === bookId) || BIBLE_BOOKS[0]
    const validChapter = Math.max(1, Math.min(chapter, targetBook.chaptersCount))
    setNav((prev) => ({
      ...prev,
      bookId: targetBook.id,
      chapter: validChapter,
    }))
  }

  const nextChapter = () => {
    if (nav.chapter < currentBook.chaptersCount) {
      setNav((prev) => ({ ...prev, chapter: prev.chapter + 1 }))
    } else if (nav.bookId < BIBLE_BOOKS.length) {
      setNav((prev) => ({
        ...prev,
        bookId: prev.bookId + 1,
        chapter: 1,
      }))
    }
  }

  const prevChapter = () => {
    if (nav.chapter > 1) {
      setNav((prev) => ({ ...prev, chapter: prev.chapter - 1 }))
    } else if (nav.bookId > 1) {
      const prevBook = BIBLE_BOOKS.find((b) => b.id === nav.bookId - 1)
      if (prevBook) {
        setNav((prev) => ({
          ...prev,
          bookId: prevBook.id,
          chapter: prevBook.chaptersCount,
        }))
      }
    }
  }

  const setTranslation = (translation: TranslationCode) => {
    setNav((prev) => ({ ...prev, translation }))
  }

  return {
    bookId: nav.bookId,
    chapter: nav.chapter,
    translation: nav.translation,
    currentBook,
    goToBookAndChapter,
    nextChapter,
    prevChapter,
    setTranslation,
  }
}
