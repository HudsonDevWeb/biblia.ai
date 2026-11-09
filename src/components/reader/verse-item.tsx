import { cn } from '@/lib/utils'

interface VerseItemProps {
  verseNumber: number
  text: string
  isSelected: boolean
  isParagraphMode: boolean
  onToggleSelect: (verseNumber: number) => void
}

export function VerseItem({
  verseNumber,
  text,
  isSelected,
  isParagraphMode,
  onToggleSelect,
}: VerseItemProps) {
  if (isParagraphMode) {
    return (
      <span
        onClick={() => onToggleSelect(verseNumber)}
        className={cn(
          'cursor-pointer transition-colors rounded px-1 py-0.5 inline',
          isSelected
            ? 'bg-primary/20 text-foreground ring-1 ring-primary/40'
            : 'hover:bg-muted/70'
        )}
      >
        <sup className="text-primary font-bold select-none text-[0.65em] mr-1">
          {verseNumber}
        </sup>
        {text}{' '}
      </span>
    )
  }

  return (
    <div
      onClick={() => onToggleSelect(verseNumber)}
      className={cn(
        'group flex items-start gap-3 py-1.5 px-3 rounded-lg cursor-pointer transition-all',
        isSelected
          ? 'bg-primary/15 ring-1 ring-primary/30'
          : 'hover:bg-muted/50'
      )}
    >
      <span className="shrink-0 w-7 text-right text-xs font-semibold text-primary/80 select-none pt-1">
        {verseNumber}
      </span>
      <p className="flex-1 text-foreground leading-relaxed">
        {text}
      </p>
    </div>
  )
}
