import { useState } from 'react'
import { Search, X, Loader2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { searchBible, type SearchResult } from '@/lib/bible-service'
import { type TranslationCode } from '@/data/translations-metadata'

interface SearchDialogProps {
  isOpen: boolean
  translation: TranslationCode
  onClose: () => void
  onSelectResult: (bookId: number, chapter: number, verse: number) => void
}

export function SearchDialog({
  isOpen,
  translation,
  onClose,
  onSelectResult,
}: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  if (!isOpen) return null

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setHasSearched(true)
    try {
      const data = await searchBible(translation, query, 50)
      setResults(data)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelect = (r: SearchResult) => {
    onSelectResult(r.bookId, r.chapter, r.verse)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Buscar na Bíblia ({translation.toUpperCase()})
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

        <form onSubmit={handleSearch} className="p-4 border-b border-border flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Digite uma palavra ou frase (ex: amor, fé, princípio)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <Button type="submit" disabled={isSearching || !query.trim()} className="gap-2">
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Buscar'}
          </Button>
        </form>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isSearching ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-sm">Pesquisando em toda a Bíblia...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground px-1 pb-1">
                Encontrados {results.length} resultados para "{query}"
              </div>
              {results.map((r, idx) => (
                <div
                  key={`${r.bookId}-${r.chapter}-${r.verse}-${idx}`}
                  onClick={() => handleSelect(r)}
                  className="p-3 rounded-lg border border-border bg-background hover:bg-muted/60 cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <BookOpen className="h-3 w-3" />
                    <span>
                      {r.bookName} {r.chapter}:{r.verse}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Nenhum versículo encontrado para "{query}".
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Digite um termo para pesquisar em todos os livros da Bíblia.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
