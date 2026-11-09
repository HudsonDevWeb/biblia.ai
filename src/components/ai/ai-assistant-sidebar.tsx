import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Settings,
  BookOpen,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AiMessageBubble,
  type ChatMessage,
} from "@/components/ai/ai-message-bubble";
import { type BibleBookMetadata } from "@/data/bible-metadata";
import { cn } from "@/lib/utils";

interface AiAssistantSidebarProps {
  isOpen: boolean;
  book: BibleBookMetadata;
  chapter: number;
  selectedVersesText: { verse: number; text: string }[];
  onClose: () => void;
  onClearSelectedVerses: () => void;
}

const API_KEY_STORAGE = "bible_ai_gemini_key";
const CHAT_HISTORY_STORAGE = "bible_ai_chat_history";
const CHAT_FONT_SIZE_STORAGE = "bible_ai_chat_font_size";
const CHAT_WIDTH_STORAGE = "bible_ai_chat_width";

const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.8-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemma-4-26b-a4b-it",
];

interface ApiResponsePart {
  thought?: boolean;
  text?: string;
}

interface ApiResponseCandidate {
  content?: {
    parts?: ApiResponsePart[];
  };
}

interface ApiResponseBody {
  candidates?: ApiResponseCandidate[];
}

function extractResponseText(data: ApiResponseBody): string {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  if (!Array.isArray(parts) || parts.length === 0) {
    return "Não foi possível obter resposta do assistente.";
  }

  const answerParts = parts.filter((p) => !p.thought && Boolean(p.text));
  if (answerParts.length > 0) {
    return answerParts.map((p) => p.text).join("\n\n");
  }

  return parts[parts.length - 1]?.text || "Sem resposta.";
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Olá! Sou seu assistente de estudos bíblicos, baseado nos princípios e teologia da Igreja Adventista do Sétimo Dia. Fique à vontade para fazer qualquer pergunta ou selecionar versículos para análise direta e concisa.",
  timestamp: new Date(),
};

export function AiAssistantSidebar({
  isOpen,
  book,
  chapter,
  selectedVersesText,
  onClose,
  onClearSelectedVerses,
}: AiAssistantSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_HISTORY_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(
            (m: {
              id: string;
              role: "user" | "assistant";
              content: string;
              timestamp: string | Date;
            }) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }),
          );
        }
      }
    } catch {
      // ignore
    }
    return [DEFAULT_WELCOME_MESSAGE];
  });

  const [chatFontSize, setChatFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(CHAT_FONT_SIZE_STORAGE);
      if (saved) {
        const num = Number(saved);
        if (num >= 12 && num <= 24) return num;
      }
    } catch {
      // ignore
    }
    return 13;
  });

  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(CHAT_WIDTH_STORAGE);
      if (saved) {
        const num = Number(saved);
        if (num >= 320 && num <= 900) return num;
      }
    } catch {
      // ignore
    }
    return 400;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(API_KEY_STORAGE) || "";
  });
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      const minWidth = 320;
      const maxWidth = Math.min(950, Math.floor(window.innerWidth * 0.7));
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_WIDTH_STORAGE, String(sidebarWidth));
    } catch {
      // ignore
    }
  }, [sidebarWidth]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_FONT_SIZE_STORAGE, String(chatFontSize));
    } catch {
      // ignore
    }
  }, [chatFontSize]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_STORAGE, JSON.stringify(messages));
    } catch {
      // ignore
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    localStorage.setItem(API_KEY_STORAGE, tempApiKey.trim());
    setApiKey(tempApiKey.trim());
    setShowConfig(false);
  };

  const handleNewChat = () => {
    try {
      localStorage.removeItem(CHAT_HISTORY_STORAGE);
    } catch {
      // ignore
    }
    setMessages([
      {
        id: String(Date.now()),
        role: "assistant",
        content:
          "Nova conversa iniciada! Como posso te ajudar em seus estudos bíblicos hoje?",
        timestamp: new Date(),
      },
    ]);
    setInput("");
    onClearSelectedVerses();
  };

  const handleClearChat = handleNewChat;

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setIsLoading(true);

    try {
      let reply = "";

      if (apiKey) {
        const hasSelectedVerses = selectedVersesText.length > 0;
        const verseContext = hasSelectedVerses
          ? selectedVersesText.map((v) => `[${v.verse}] ${v.text}`).join(" ")
          : "";

        const contextInstruction = hasSelectedVerses
          ? `O usuário selecionou os seguintes versículos específicos de ${book.name} ${chapter} para análise: "${verseContext}". Foque sua resposta especificamente neles.`
          : "O usuário fez uma pergunta aberta ou geral. Responda à pergunta dele diretamente sem forçar ligação com capítulos ou livros bíblicos específicos, a menos que ele mencione.";

        const prompt = `Você é um teólogo bíblico erudito e devoto que responde com base estrita nos princípios, doutrinas e cosmovisão da Igreja Adventista do Sétimo Dia (IASD).

Diretrizes fundamentais para sua resposta:
1. Pilares teológicos da IASD:
- Sola Scriptura (a Bíblia como única regra de fé e prática).
- Historicismo na interpretação das profecias bíblicas (Daniel, Apocalipse).
- O Grande Conflito entre Cristo e Satanás.
- A vigência perpétua da Lei de Deus e a santidade do Sábado (quarto mandamento).
- O santuário celestial e o juízo investigativo iniciado em 1844.
- A mortalidade condicional da alma (o estado inconsciente dos mortos como sono até a ressurreição).
- A salvação unicamente pela graça mediante a fé em Jesus Cristo.
- A segunda vinda visível, literal e iminente de Cristo.
- O dom profético manifestado no ministério de Ellen G. White como luz menor que aponta para a Bíblia.

2. Estilo de escrita:
- Seja enxuto, direto e objetivo.
- Evite rodeios, introduções prolixas ou textos longos demais.
- Estruture em poucos pontos ou parágrafos curtos e concisos.
- Use negritos em termos e referências importantes para boa leitura.
- Cite referências bíblicas chave de forma pontual.

3. Contexto da questão:
${contextInstruction}

Pergunta do usuário:
${userMsg.content}`;

        let success = false;
        let lastError = "";

        for (const model of CANDIDATE_MODELS) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
                }),
              },
            );

            if (response.ok) {
              const data = await response.json();
              reply = extractResponseText(data);
              success = true;
              break;
            } else {
              const errData = await response.json().catch(() => null);
              lastError =
                errData?.error?.message ||
                `Erro ${response.status} ao consultar ${model}`;
            }
          } catch (e: unknown) {
            if (e instanceof Error) {
              lastError = e.message;
            } else {
              lastError = "Falha na conexão com a API";
            }
          }
        }

        if (!success) {
          try {
            const listRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            );
            if (listRes.ok) {
              const listData = await listRes.json();
              const availableModels: string[] = (listData.models || [])
                .filter((m: { supportedGenerationMethods?: string[] }) =>
                  m.supportedGenerationMethods?.includes("generateContent"),
                )
                .map((m: { name: string }) => m.name.replace(/^models\//, ""));

              for (const model of availableModels) {
                const response = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      contents: [{ parts: [{ text: prompt }] }],
                    }),
                  },
                );

                if (response.ok) {
                  const data = await response.json();
                  reply = extractResponseText(data);
                  success = true;
                  break;
                }
              }
            }
          } catch {
            // ignore
          }
        }

        if (!success) {
          throw new Error(
            lastError || "Não foi possível conectar aos modelos do Gemini.",
          );
        }
      } else {
        await new Promise((res) => setTimeout(res, 600));
        if (selectedVersesText.length > 0) {
          reply = `Comentário Teológico IASD sobre **${book.name} ${chapter}:${selectedVersesText
            .map((v) => v.verse)
            .join(",")}**:

📖 **Versículos:** "${selectedVersesText.map((v) => v.text).join(" ")}"

* **Princípio Bíblico:** A passagem revela a soberania divina dentro da perspectiva do Grande Conflito.
* **Aplicação Prática:** Submissão à vontade de Deus e fidelidade aos Seus mandamentos.

*(Insira sua chave de API para análises personalizadas em tempo real)*`;
        } else {
          reply = `**Perspectiva Teológica IASD:**
Sob a ótica adventista fundamentada em *Sola Scriptura*, toda doutrina e dúvida de fé deve ser avaliada à luz da harmonia total das Escrituras Sagradas, ressaltando a graça salvadora de Cristo, a santidade da Lei de Deus e a esperança do Seu breve retorno.`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Verifique se a sua chave de API está correta.";
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: `Ocorreu um erro ao consultar o assistente:\n\n${errorMsg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className="border-l border-border bg-card flex flex-col h-full shrink-0 select-none relative"
    >
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        title="Arraste para redimensionar o painel"
        className={cn(
          "absolute -left-1.5 top-0 bottom-0 w-3 cursor-col-resize z-40 group flex items-center justify-center transition-colors",
          isDragging ? "bg-primary/20" : "hover:bg-primary/20",
        )}
      >
        <div
          className={cn(
            "w-0.5 h-10 rounded-full transition-colors",
            isDragging
              ? "bg-primary"
              : "bg-muted-foreground/30 group-hover:bg-primary",
          )}
        />
      </div>

      <div className="h-14 border-b border-border px-3.5 flex items-center justify-between gap-1">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <div className="flex flex-col truncate">
            <h2 className="text-sm font-semibold text-foreground leading-tight truncate">
              Assistente Bíblico
            </h2>
            <span className="text-[10px] text-muted-foreground truncate">
              Teologia IASD
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center bg-muted/60 rounded-md p-0.5 border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatFontSize((prev) => Math.max(12, prev - 1))}
              disabled={chatFontSize <= 12}
              title="Diminuir fonte do chat"
              className="h-6 w-5 p-0 text-[10px] font-bold text-muted-foreground hover:text-foreground"
            >
              A-
            </Button>
            <span className="text-[10px] font-semibold text-muted-foreground px-1 select-none">
              {chatFontSize}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatFontSize((prev) => Math.min(22, prev + 1))}
              disabled={chatFontSize >= 22}
              title="Aumentar fonte do chat"
              className="h-6 w-5 p-0 text-[10px] font-bold text-muted-foreground hover:text-foreground"
            >
              A+
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            title="Iniciar nova conversa e limpar contexto"
            className="h-7 px-2 text-xs font-semibold gap-1 text-foreground hover:bg-muted shrink-0"
          >
            <Plus className="h-3.5 w-3.5 text-primary" />
            <span>Novo</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowConfig(!showConfig)}
            title="Configurar chave de API"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            title="Limpar histórico de conversa"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {showConfig && (
        <div className="p-4 border-b border-border bg-muted/40 space-y-3">
          <div className="text-xs font-semibold text-foreground">
            Chave de API do Google Gemini
          </div>
          <p className="text-[11px] text-muted-foreground">
            Insira sua chave gratuita do Google AI Studio para ter respostas
            completas.
          </p>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            className="w-full bg-background border border-input rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfig(false)}
              className="text-xs h-7"
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveApiKey}
              className="text-xs h-7"
            >
              Salvar Chave
            </Button>
          </div>
        </div>
      )}

      {selectedVersesText.length > 0 && (
        <div className="p-2.5 border-b border-border bg-primary/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate text-xs text-primary font-medium">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              Contexto ativo: {book.name} {chapter}:
              {selectedVersesText.map((v) => v.verse).join(", ")}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelectedVerses}
            title="Remover contexto para perguntar livremente"
            className="h-6 w-6 text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <AiMessageBubble key={m.id} message={m} fontSize={chatFontSize} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            <span>Consultando assistente...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-border space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleSend(
                selectedVersesText.length > 0
                  ? "Explique a visão teológica e o contexto desta passagem"
                  : "Quais são os pilares fundamentais da mensagem bíblica adventista?",
              )
            }
            className="text-[10px] h-6 px-2 whitespace-nowrap shrink-0"
          >
            {selectedVersesText.length > 0
              ? "Explicar Passagem"
              : "Pilares Bíblicos"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleSend(
                selectedVersesText.length > 0
                  ? "Como esta passagem se relaciona com a doutrina adventista?"
                  : "O que a Bíblia ensina sobre o sábado e o grande conflito?",
              )
            }
            className="text-[10px] h-6 px-2 whitespace-nowrap shrink-0"
          >
            {selectedVersesText.length > 0
              ? "Doutrina Bíblica"
              : "Sábado & Conflito"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleSend(
                selectedVersesText.length > 0
                  ? "Qual a aplicação prática e espiritual deste texto?"
                  : "O que a Bíblia ensina sobre o estado do ser humano na morte?",
              )
            }
            className="text-[10px] h-6 px-2 whitespace-nowrap shrink-0"
          >
            {selectedVersesText.length > 0
              ? "Aplicação Prática"
              : "Estado dos Mortos"}
          </Button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder={
              selectedVersesText.length > 0
                ? "Perguntar sobre os versículos selecionados..."
                : "Pergunte qualquer coisa sobre a Bíblia..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-background border border-input rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-8 w-8 shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
