import { useState, useEffect } from 'react'

export type ThemeMode = 'light' | 'dark' | 'sepia'
export type FontFamily = 'serif' | 'sans'
export type LineHeight = 'normal' | 'relaxed' | 'loose'
export type VerseViewMode = 'verse' | 'paragraph'

export interface ReaderSettings {
  fontSize: number
  fontFamily: FontFamily
  theme: ThemeMode
  lineHeight: LineHeight
  verseViewMode: VerseViewMode
}

const STORAGE_KEY = 'bible_reader_settings'

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 18,
  fontFamily: 'serif',
  theme: 'light',
  lineHeight: 'relaxed',
  verseViewMode: 'verse',
}

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      }
    } catch {
      return DEFAULT_SETTINGS
    }
    return DEFAULT_SETTINGS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }

    const root = document.documentElement
    root.classList.remove('dark', 'sepia')
    if (settings.theme === 'dark') {
      root.classList.add('dark')
    } else if (settings.theme === 'sepia') {
      root.classList.add('sepia')
    }
  }, [settings])

  const setFontSize = (size: number) => {
    setSettings((prev) => ({ ...prev, fontSize: Math.min(36, Math.max(14, size)) }))
  }

  const setFontFamily = (family: FontFamily) => {
    setSettings((prev) => ({ ...prev, fontFamily: family }))
  }

  const setTheme = (theme: ThemeMode) => {
    setSettings((prev) => ({ ...prev, theme }))
  }

  const setLineHeight = (lineHeight: LineHeight) => {
    setSettings((prev) => ({ ...prev, lineHeight }))
  }

  const setVerseViewMode = (mode: VerseViewMode) => {
    setSettings((prev) => ({ ...prev, verseViewMode: mode }))
  }

  return {
    settings,
    setFontSize,
    setFontFamily,
    setTheme,
    setLineHeight,
    setVerseViewMode,
  }
}
