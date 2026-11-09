import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VerseItem } from '@/components/reader/verse-item'
import { type BibleBookMetadata } from '@/data/bible-metadata'
import { type ReaderSettings } from '@/hooks/use-reader-settings'

interface ChapterViewProps {
  book: BibleBookMetadata
  chapter: number
  verses: string[]
  isLoading: boolean
  settings: ReaderSettings
  selectedVerses: number[]
  onToggleVerseSelect: (verseNumber: number) => void
  onPrevChapter: () => void
  onNextChapter: () => void
  hasPrev: boolean
  hasNext: boolean
}

export function ChapterView({
  book,
  chapter,
  verses,
  isLoading,
  settings,
  selectedVerses,
  onToggleVerseSelect,
  onPrevChapter,
  onNextChapter,
  hasPrev,
  hasNext,
}: ChapterViewProps) {
  const fontClass = settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'

  const lineHeightClass =
    settings.lineHeight === 'loose'
      ? 'leading-loose'
      : settings.lineHeight === 'relaxed'
      ? 'leading-relaxed'
      : 'leading-normal'

  return (
    <div className="flex-1 overflow-y-auto w-full h-full">
      <div className="px-6 md:px-16 py-10 max-w-5xl mx-auto w-full">
        <div className="text-center mb-8 pb-4 border-b border-border">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {book.name} {chapter}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {book.group} • {book.testament === 'OT' ? 'Antigo Testamento' : 'Novo Testamento'}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4 py-8 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        ) : (
          <div
            className={`${fontClass} ${lineHeightClass}`}
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            {settings.verseViewMode === 'paragraph' ? (
              <div className="text-justify leading-relaxed">
                {verses.map((text, idx) => {
                  const verseNumber = idx + 1
                  return (
                    <VerseItem
                      key={verseNumber}
                      verseNumber={verseNumber}
                      text={text}
                      isSelected={selectedVerses.includes(verseNumber)}
                      isParagraphMode={true}
                      onToggleSelect={onToggleVerseSelect}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="space-y-1">
                {verses.map((text, idx) => {
                  const verseNumber = idx + 1
                  return (
                    <VerseItem
                      key={verseNumber}
                      verseNumber={verseNumber}
                      text={text}
                      isSelected={selectedVerses.includes(verseNumber)}
                      isParagraphMode={false}
                      onToggleSelect={onToggleVerseSelect}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-12 pb-16 border-t border-border mt-12">
          <Button
            variant="outline"
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className="gap-2 text-foreground hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            Capítulo Anterior
          </Button>
          <span className="text-xs text-muted-foreground font-medium">
            {book.name} {chapter} de {book.chaptersCount}
          </span>
          <Button
            variant="outline"
            onClick={onNextChapter}
            disabled={!hasNext}
            className="gap-2 text-foreground hover:bg-muted"
          >
            Próximo Capítulo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
