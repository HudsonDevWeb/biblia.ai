import { Copy, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VerseActionBarProps {
  selectedCount: number
  onCopy: () => void
  onAskAi: () => void
  onClear: () => void
}

export function VerseActionBar({
  selectedCount,
  onCopy,
  onAskAi,
  onClear,
}: VerseActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border border-border shadow-xl rounded-full px-4 py-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <span className="text-xs font-semibold text-foreground px-2">
        {selectedCount} {selectedCount === 1 ? 'versículo selecionado' : 'versículos selecionados'}
      </span>
      <div className="h-4 w-px bg-border" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onCopy}
        className="h-8 gap-1.5 text-xs text-foreground hover:bg-muted"
      >
        <Copy className="h-3.5 w-3.5" />
        Copiar
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={onAskAi}
        className="h-8 gap-1.5 text-xs bg-primary text-primary-foreground"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Explicar com IA
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
