import { ChevronDown, SlidersHorizontal, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranslationSwitcher } from "@/components/reader/translation-switcher";
import { type BibleBookMetadata } from "@/data/bible-metadata";
import { type TranslationCode } from "@/data/translations-metadata";

interface ReaderHeaderProps {
  book: BibleBookMetadata;
  chapter: number;
  translation: TranslationCode;
  isAiOpen: boolean;
  onOpenBookSelector: () => void;
  onSelectTranslation: (code: TranslationCode) => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onToggleAi: () => void;
}

export function ReaderHeader({
  book,
  chapter,
  translation,
  isAiOpen,
  onOpenBookSelector,
  onSelectTranslation,
  onOpenSettings,
  onOpenSearch,
  onToggleAi,
}: ReaderHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur px-4 flex items-center justify-between gap-2 shrink-0 select-none relative z-30">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenBookSelector}
          className="gap-2 font-bold text-sm text-foreground h-9 shadow-sm"
        >
          <span>
            {book.name} {chapter}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>

        <TranslationSwitcher
          currentTranslation={translation}
          onSelectTranslation={onSelectTranslation}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSearch}
          title="Pesquisar versículos"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          title="Ajustar aparência e fonte"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <Button
          variant={isAiOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleAi}
          className="gap-1.5 text-xs font-semibold h-9"
        >
          <Sparkles className="h-3.5 w-3.5 " />
          <span className="hidden sm:inline">Assistente Bíblico</span>
        </Button>
      </div>
    </header>
  );
}
