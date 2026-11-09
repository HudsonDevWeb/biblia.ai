import React from 'react'

interface FormattedMarkdownProps {
  content: string
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-foreground/90">
          {token.slice(1, -1)}
        </em>
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="bg-muted px-1 py-0.5 rounded text-[0.9em] font-mono"
        >
          {token.slice(1, -1)}
        </code>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export function FormattedMarkdown({ content }: FormattedMarkdownProps) {
  const lines = content.split('\n')

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />
        }

        if (trimmed === '---') {
          return <hr key={idx} className="my-2 border-border" />
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="font-bold text-foreground text-[1.1em] mt-2 mb-1"
            >
              {parseInline(trimmed.slice(4))}
            </h4>
          )
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="font-bold text-foreground text-[1.15em] mt-2.5 mb-1"
            >
              {parseInline(trimmed.slice(3))}
            </h3>
          )
        }

        if (trimmed.startsWith('# ')) {
          return (
            <h2
              key={idx}
              className="font-bold text-foreground text-[1.2em] mt-3 mb-1"
            >
              {parseInline(trimmed.slice(2))}
            </h2>
          )
        }

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-2 ml-2">
              <span className="text-primary mt-1 text-[0.7em] select-none shrink-0">
                ●
              </span>
              <span className="flex-1">{parseInline(trimmed.slice(2))}</span>
            </div>
          )
        }

        return <p key={idx}>{parseInline(line)}</p>
      })}
    </div>
  )
}
