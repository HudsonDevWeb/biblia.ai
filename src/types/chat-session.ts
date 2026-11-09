import { type ChatMessage } from '@/components/ai/ai-message-bubble'

export interface ChatSession {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
}
