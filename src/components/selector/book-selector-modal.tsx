import { useState } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookCard } from '@/components/selector/book-card'
import { ChapterBadge } from '@/components/selector/chapter-badge'
import { BIBLE_BOOKS, type BibleBookMetadata } from '@/data/bible-metadata'

interface BookSelectorModalProps {
  isOpen: boolean
  currentBookId: number
  currentChapter: number
  onClose: () => void
  onSelect: (bookId: number, chapter: number) => void
}

type TestamentFilter = 'all' | 'OT' | 'NT'

export function BookSelectorModal({
  isOpen,
  currentBookId,
  currentChapter,
  onClose,
  onSelect,
}: BookSelectorModalProps) {
  const [selectedBook, setSelectedBook] = useState<BibleBookMetadata | null>(() => {
    return BIBLE_BOOKS.find((b) => b.id === currentBookId) || BIBLE_BOOKS[0]
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<TestamentFilter>('all')

  if (!isOpen) return null

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'OT' && b.testament === 'OT') ||
      (filter === 'NT' && b.testament === 'NT')

    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.abbrev.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const handleBookClick = (book: BibleBookMetadata) => {
    setSelectedBook(book)
  }

  const handleChapterClick = (chapterNumber: number) => {
    if (selectedBook) {
      onSelect(selectedBook.id, chapterNumber)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedBook && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedBook(null)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h2 className="text-base font-semibold text-foreground">
              {selectedBook ? `${selectedBook.name} — Escolha o Capítulo` : 'Escolha o Livro'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {selectedBook ? (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map(
                (ch) => (
                  <ChapterBadge
                    key={ch}
                    chapterNumber={ch}
                    isCurrent={selectedBook.id === currentBookId && ch === currentChapter}
                    onSelect={handleChapterClick}
                  />
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 space-y-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Pesquisar livro (ex: Gênesis, João, Salmos)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className="text-xs"
                >
                  Todos ({BIBLE_BOOKS.length})
                </Button>
                <Button
                  variant={filter === 'OT' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('OT')}
                  className="text-xs"
                >
                  Antigo Testamento (39)
                </Button>
                <Button
                  variant={filter === 'NT' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('NT')}
                  className="text-xs"
                >
                  Novo Testamento (27)
                </Button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isSelected={book.id === currentBookId}
                  onSelect={handleBookClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
