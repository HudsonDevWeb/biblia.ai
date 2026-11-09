import { useState } from 'react'
import dayjs from 'dayjs'
import { Sparkles, User, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormattedMarkdown } from '@/components/ai/formatted-markdown'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AiMessageBubbleProps {
  message: ChatMessage
  fontSize?: number
}

export function AiMessageBubble({ message, fontSize = 13 }: AiMessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isAssistant = message.role === 'assistant'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'group flex gap-2.5 items-start relative',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}

      <div
        style={{ fontSize: `${fontSize}px` }}
        className={cn(
          'rounded-2xl px-3.5 py-2.5 max-w-[88%] leading-relaxed space-y-2 relative',
          isAssistant
            ? 'bg-muted/80 text-foreground border border-border'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <FormattedMarkdown content={message.content} />

        <div className="flex items-center justify-between pt-1 border-t border-border/40 gap-3">
          {isAssistant ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 px-1.5 text-[11px] text-muted-foreground hover:text-foreground gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-primary" />
                  <span className="text-primary font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copiar</span>
                </>
              )}
            </Button>
          ) : (
            <div />
          )}

          <div
            className={cn(
              'text-[10px] font-medium',
              isAssistant
                ? 'text-muted-foreground'
                : 'text-primary-foreground/75'
            )}
          >
            {dayjs(message.timestamp).format('HH:mm')}
          </div>
        </div>
      </div>

      {!isAssistant && (
        <div className="h-6 w-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  )
}
