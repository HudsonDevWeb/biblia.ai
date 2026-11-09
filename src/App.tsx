import { useState, useEffect, useCallback } from "react";
import { ReaderHeader } from "@/components/reader/reader-header";
import { ChapterView } from "@/components/reader/chapter-view";
import { VerseActionBar } from "@/components/reader/verse-action-bar";
import { BookSelectorModal } from "@/components/selector/book-selector-modal";
import { ReaderSettingsDialog } from "@/components/settings/reader-settings-dialog";
import { SearchDialog } from "@/components/search/search-dialog";
import { AiAssistantSidebar } from "@/components/ai/ai-assistant-sidebar";
import { useBibleNavigation } from "@/hooks/use-bible-navigation";
import { useReaderSettings } from "@/hooks/use-reader-settings";
import { getChapterVerses } from "@/lib/bible-service";
import { BIBLE_BOOKS } from "@/data/bible-metadata";

export function App() {
  const {
    bookId,
    chapter,
    translation,
    currentBook,
    goToBookAndChapter,
    nextChapter,
    prevChapter,
    setTranslation,
  } = useBibleNavigation();

  const {
    settings,
    setFontSize,
    setFontFamily,
    setTheme,
    setLineHeight,
    setVerseViewMode,
  } = useReaderSettings();

  const [verses, setVerses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const loadVerses = useCallback(async () => {
    setIsLoading(true);
    setSelectedVerses([]);
    try {
      const data = await getChapterVerses(translation, bookId, chapter);
      setVerses(data);
    } finally {
      setIsLoading(false);
    }
  }, [translation, bookId, chapter]);

  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        nextChapter();
      } else if (e.key === "ArrowLeft") {
        prevChapter();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === "Escape") {
        setSelectedVerses([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextChapter, prevChapter]);

  const handleToggleVerseSelect = (verseNumber: number) => {
    setSelectedVerses((prev) =>
      prev.includes(verseNumber)
        ? prev.filter((v) => v !== verseNumber)
        : [...prev, verseNumber].sort((a, b) => a - b),
    );
  };

  const handleCopySelected = () => {
    if (selectedVerses.length === 0) return;
    const textToCopy = selectedVerses
      .map(
        (num) => `${currentBook.name} ${chapter}:${num} — "${verses[num - 1]}"`,
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    setSelectedVerses([]);
  };

  const handleAskAiAboutSelected = () => {
    setIsAiOpen(true);
  };

  const selectedVersesText = selectedVerses.map((num) => ({
    verse: num,
    text: verses[num - 1] || "",
  }));

  const hasPrev = !(bookId === 1 && chapter === 1);
  const hasNext = !(
    bookId === BIBLE_BOOKS.length && chapter === currentBook.chaptersCount
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      <ReaderHeader
        book={currentBook}
        chapter={chapter}
        translation={translation}
        isAiOpen={isAiOpen}
        onOpenBookSelector={() => setIsBookModalOpen(true)}
        onSelectTranslation={setTranslation}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleAi={() => setIsAiOpen(!isAiOpen)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <ChapterView
            book={currentBook}
            chapter={chapter}
            verses={verses}
            isLoading={isLoading}
            settings={settings}
            selectedVerses={selectedVerses}
            onToggleVerseSelect={handleToggleVerseSelect}
            onPrevChapter={prevChapter}
            onNextChapter={nextChapter}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />

          <VerseActionBar
            selectedCount={selectedVerses.length}
            onCopy={handleCopySelected}
            onAskAi={handleAskAiAboutSelected}
            onClear={() => setSelectedVerses([])}
          />
        </main>

        <AiAssistantSidebar
          isOpen={isAiOpen}
          book={currentBook}
          chapter={chapter}
          selectedVersesText={selectedVersesText}
          onClose={() => setIsAiOpen(false)}
          onClearSelectedVerses={() => setSelectedVerses([])}
        />
      </div>

      <BookSelectorModal
        isOpen={isBookModalOpen}
        currentBookId={bookId}
        currentChapter={chapter}
        onClose={() => setIsBookModalOpen(false)}
        onSelect={goToBookAndChapter}
      />

      <ReaderSettingsDialog
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onSetFontSize={setFontSize}
        onSetFontFamily={setFontFamily}
        onSetTheme={setTheme}
        onSetLineHeight={setLineHeight}
        onSetVerseViewMode={setVerseViewMode}
      />

      <SearchDialog
        isOpen={isSearchOpen}
        translation={translation}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(bId, ch) => {
          goToBookAndChapter(bId, ch);
        }}
      />
    </div>
  );
}
