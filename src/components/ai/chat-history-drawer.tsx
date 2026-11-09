import { History, X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatSessionItem } from '@/components/ai/chat-session-item'
import { type ChatSession } from '@/types/chat-session'

interface ChatHistoryDrawerProps {
  isOpen: boolean
  sessions: ChatSession[]
  activeSessionId: string
  onClose: () => void
  onSelectSession: (session: ChatSession) => void
  onDeleteSession: (sessionId: string) => void
  onClearAll: () => void
  onNewChat: () => void
}

export function ChatHistoryDrawer({
  isOpen,
  sessions,
  activeSessionId,
  onClose,
  onSelectSession,
  onDeleteSession,
  onClearAll,
  onNewChat,
}: ChatHistoryDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
      <div className="h-14 border-b border-border px-4 flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Conversas Anteriores
          </h3>
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

      <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            onNewChat()
            onClose()
          }}
          className="h-8 text-xs font-semibold gap-1.5 flex-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Nova Conversa
        </Button>

        {sessions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            title="Apagar todas as conversas salvas"
            className="h-8 text-xs text-muted-foreground hover:text-destructive gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpar Tudo
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sessions.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-xs space-y-2">
            <History className="h-8 w-8 mx-auto opacity-40 text-muted-foreground" />
            <p>Nenhuma conversa salva ainda.</p>
            <p className="text-[11px] opacity-75">
              Suas conversas com o assistente ficarão salvas aqui enquanto o app estiver instalado.
            </p>
          </div>
        ) : (
          sessions.map((s) => (
            <ChatSessionItem
              key={s.id}
              session={s}
              isActive={s.id === activeSessionId}
              onSelect={(selected) => {
                onSelectSession(selected)
                onClose()
              }}
              onDelete={onDeleteSession}
            />
          ))
        )}
      </div>
    </div>
  )
}
