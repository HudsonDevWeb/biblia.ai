import dayjs from 'dayjs'
import { MessageSquare, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type ChatSession } from '@/types/chat-session'
import { cn } from '@/lib/utils'

interface ChatSessionItemProps {
  session: ChatSession
  isActive: boolean
  onSelect: (session: ChatSession) => void
  onDelete: (sessionId: string) => void
}

export function ChatSessionItem({
  session,
  isActive,
  onSelect,
  onDelete,
}: ChatSessionItemProps) {
  const formattedDate = dayjs(session.updatedAt).format('DD/MM/YYYY HH:mm')

  return (
    <div
      onClick={() => onSelect(session)}
      className={cn(
        'group p-3 rounded-xl border border-border transition-all cursor-pointer flex items-start justify-between gap-2',
        isActive
          ? 'bg-primary/10 border-primary/40'
          : 'bg-background hover:bg-muted/60'
      )}
    >
      <div className="flex items-start gap-2.5 min-w-0 flex-1">
        <MessageSquare
          className={cn(
            'h-4 w-4 shrink-0 mt-0.5',
            isActive ? 'text-primary' : 'text-muted-foreground'
          )}
        />
        <div className="flex flex-col min-w-0 flex-1">
          <span
            className={cn(
              'text-xs font-semibold truncate',
              isActive ? 'text-primary' : 'text-foreground'
            )}
          >
            {session.title || 'Conversa sem título'}
          </span>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{session.messages.length} msgs</span>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(session.id)
        }}
        title="Excluir esta conversa"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0 transition-opacity"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  )
}
