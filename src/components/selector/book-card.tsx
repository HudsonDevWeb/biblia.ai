import { Button } from '@/components/ui/button'
import { type BibleBookMetadata } from '@/data/bible-metadata'
import { cn } from '@/lib/utils'

interface BookCardProps {
  book: BibleBookMetadata
  isSelected: boolean
  onSelect: (book: BibleBookMetadata) => void
}

export function BookCard({ book, isSelected, onSelect }: BookCardProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onSelect(book)}
      className={cn(
        'h-auto py-2.5 px-3 flex flex-col items-start justify-start text-left transition-all',
        isSelected
          ? 'border-primary bg-primary/10 text-primary font-semibold'
          : 'hover:border-primary/50 text-foreground'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium truncate">{book.name}</span>
        <span className="text-[10px] text-muted-foreground ml-1 shrink-0 font-normal">
          {book.chaptersCount} cap.
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">{book.group}</span>
    </Button>
  )
}
