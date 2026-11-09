import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChapterBadgeProps {
  chapterNumber: number
  isCurrent: boolean
  onSelect: (chapterNumber: number) => void
}

export function ChapterBadge({
  chapterNumber,
  isCurrent,
  onSelect,
}: ChapterBadgeProps) {
  return (
    <Button
      variant={isCurrent ? 'default' : 'outline'}
      size="sm"
      onClick={() => onSelect(chapterNumber)}
      className={cn(
        'h-10 w-full text-sm font-semibold rounded-lg',
        isCurrent
          ? 'bg-primary text-primary-foreground shadow'
          : 'hover:bg-muted text-foreground'
      )}
    >
      {chapterNumber}
    </Button>
  )
}
