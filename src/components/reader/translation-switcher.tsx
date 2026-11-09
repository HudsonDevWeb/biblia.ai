import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TRANSLATIONS, type TranslationCode } from '@/data/translations-metadata'
import { cn } from '@/lib/utils'

interface TranslationSwitcherProps {
  currentTranslation: TranslationCode
  onSelectTranslation: (code: TranslationCode) => void
}

export function TranslationSwitcher({
  currentTranslation,
  onSelectTranslation,
}: TranslationSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current =
    TRANSLATIONS.find((t) => t.code === currentTranslation) || TRANSLATIONS[0]

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="gap-1.5 font-semibold text-xs text-foreground h-9"
      >
        <span>{current.name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>

      {isOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="text-[11px] font-medium text-muted-foreground px-2 py-1">
            Escolher Tradução
          </div>
          {TRANSLATIONS.map((t) => {
            const isSelected = currentTranslation === t.code
            return (
              <Button
                key={t.code}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSelectTranslation(t.code)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full justify-between h-auto py-2 px-2.5 text-left rounded-lg transition-colors',
                  isSelected
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold">{t.name}</span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    {t.fullName}
                  </span>
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}
