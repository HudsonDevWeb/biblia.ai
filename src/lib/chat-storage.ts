import { type ChatSession } from '@/types/chat-session'

const SESSIONS_KEY = 'bible_ai_chat_sessions'
const ACTIVE_SESSION_ID_KEY = 'bible_ai_active_session_id'

export function loadAllSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  } catch {
    return []
  }
}

export function saveSession(session: ChatSession): void {
  try {
    const sessions = loadAllSessions()
    const index = sessions.findIndex((s) => s.id === session.id)
    if (index >= 0) {
      sessions[index] = session
    } else {
      sessions.unshift(session)
    }
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  } catch {
    // ignore
  }
}

export function deleteSession(sessionId: string): void {
  try {
    const sessions = loadAllSessions().filter((s) => s.id !== sessionId)
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  } catch {
    // ignore
  }
}

export function clearAllSessions(): void {
  try {
    localStorage.removeItem(SESSIONS_KEY)
    localStorage.removeItem(ACTIVE_SESSION_ID_KEY)
  } catch {
    // ignore
  }
}

export function getActiveSessionId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_SESSION_ID_KEY)
  } catch {
    return null
  }
}

export function setActiveSessionId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_SESSION_ID_KEY, id)
  } catch {
    // ignore
  }
}
