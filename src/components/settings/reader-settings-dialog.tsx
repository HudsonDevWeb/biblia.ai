import { X, Sun, Moon, BookOpenText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  type ReaderSettings,
  type ThemeMode,
  type FontFamily,
  type LineHeight,
  type VerseViewMode,
} from '@/hooks/use-reader-settings'

interface ReaderSettingsDialogProps {
  isOpen: boolean
  settings: ReaderSettings
  onClose: () => void
  onSetFontSize: (size: number) => void
  onSetFontFamily: (family: FontFamily) => void
  onSetTheme: (theme: ThemeMode) => void
  onSetLineHeight: (lineHeight: LineHeight) => void
  onSetVerseViewMode: (mode: VerseViewMode) => void
}

export function ReaderSettingsDialog({
  isOpen,
  settings,
  onClose,
  onSetFontSize,
  onSetFontFamily,
  onSetTheme,
  onSetLineHeight,
  onSetVerseViewMode,
}: ReaderSettingsDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Aparência & Leitura
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Tamanho da Fonte
              </span>
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {settings.fontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetFontSize(settings.fontSize - 1)}
                disabled={settings.fontSize <= 14}
                className="h-8 w-8 p-0 text-xs font-bold"
              >
                A-
              </Button>
              <Slider
                value={[settings.fontSize]}
                min={14}
                max={32}
                step={1}
                onValueChange={(val) => onSetFontSize(val[0])}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetFontSize(settings.fontSize + 1)}
                disabled={settings.fontSize >= 32}
                className="h-8 w-8 p-0 text-sm font-bold"
              >
                A+
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              Tipografia
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={settings.fontFamily === 'serif' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetFontFamily('serif')}
                className="font-serif justify-center text-sm"
              >
                Serifada (Livro)
              </Button>
              <Button
                variant={settings.fontFamily === 'sans' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetFontFamily('sans')}
                className="font-sans justify-center text-sm"
              >
                Moderna (Sans)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              Tema Visual
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetTheme('light')}
                className="gap-1.5 text-xs"
              >
                <Sun className="h-3.5 w-3.5" />
                Claro
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetTheme('dark')}
                className="gap-1.5 text-xs"
              >
                <Moon className="h-3.5 w-3.5" />
                Escuro
              </Button>
              <Button
                variant={settings.theme === 'sepia' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetTheme('sepia')}
                className="gap-1.5 text-xs"
              >
                <BookOpenText className="h-3.5 w-3.5" />
                Sépia
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              Espaçamento de Linhas
            </span>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={settings.lineHeight === 'normal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetLineHeight('normal')}
                className="text-xs"
              >
                Padrão
              </Button>
              <Button
                variant={settings.lineHeight === 'relaxed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetLineHeight('relaxed')}
                className="text-xs"
              >
                Confortável
              </Button>
              <Button
                variant={settings.lineHeight === 'loose' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetLineHeight('loose')}
                className="text-xs"
              >
                Amplo
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              Modo de Exibição
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={settings.verseViewMode === 'verse' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetVerseViewMode('verse')}
                className="text-xs"
              >
                Versículo por Linha
              </Button>
              <Button
                variant={settings.verseViewMode === 'paragraph' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSetVerseViewMode('paragraph')}
                className="text-xs"
              >
                Texto Corrido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
