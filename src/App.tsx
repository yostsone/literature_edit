import React, { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { HighlightedText, type HighlightSpan } from "./component/HighlightedText";
import { HIGHLIGHT_TYPES, storageKeyForType } from "./types/highlightTypes";
import HighLights from "./component/HighLights";
GlobalWorkerOptions.workerSrc = workerSrc;

const STORAGE_TEXT_KEY = "pdf_text";

export default function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [spansByType, setSpansByType] = useState<Record<string, HighlightSpan[]>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Load persisted data
  useEffect(() => {
    const savedText = localStorage.getItem(STORAGE_TEXT_KEY);
    if (savedText) setPdfText(savedText);

    const initialSpans: Record<string, HighlightSpan[]> = {};
    for (const t of HIGHLIGHT_TYPES) {
      const raw = localStorage.getItem(storageKeyForType(t.id));
      if (raw) {
        try {
          const arr = JSON.parse(raw) as HighlightSpan[];
          initialSpans[t.id] = Array.isArray(arr) ? arr : [];
        } catch {
          initialSpans[t.id] = [];
        }
      } else {
        initialSpans[t.id] = [];
      }
    }
    setSpansByType(initialSpans);
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_TEXT_KEY, pdfText);
  }, [pdfText]);

  useEffect(() => {
    for (const t of HIGHLIGHT_TYPES) {
      localStorage.setItem(storageKeyForType(t.id), JSON.stringify(spansByType[t.id] ?? []));
    }
  }, [spansByType]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = (content.items as any[]).map((it: any) => it.str).join(" ");
        fullText += strings + "\n\n";
      }
      setPdfText(fullText.trim());
      // Reset highlights
      const cleared: Record<string, HighlightSpan[]> = {};
      for (const t of HIGHLIGHT_TYPES) cleared[t.id] = [];
      setSpansByType(cleared);
    } catch (err) {
      console.error("Failed reading PDF:", err);
      alert("Failed to read PDF. See console.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function charOffsetWithin(container: HTMLElement, targetNode: Node, nodeOffset: number): number {
    const r = document.createRange();
    r.selectNodeContents(container);
    r.setEnd(targetNode, nodeOffset);
    return r.toString().length;
  }

  function getSelectionRangeInside(): { start: number; end: number } | null {
    if (!textRef.current) return null;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (
        !textRef.current.contains(range.startContainer) ||
        !textRef.current.contains(range.endContainer)
    ) return null;
    let start = charOffsetWithin(textRef.current, range.startContainer, range.startOffset);
    let end = charOffsetWithin(textRef.current, range.endContainer, range.endOffset);
    if (start === end) return null;
    if (start > end) [start, end] = [end, start];
    return { start, end };
  }

  function addHighlightForType(typeId: string) {
    if (!pdfText) {
      return;
    }
    const selection = getSelectionRangeInside();
    if (!selection) {
      return;
    }
    const type = HIGHLIGHT_TYPES.find(t => t.id === typeId);
    if (!type) return;
    const { start, end } = selection;
    const newSpan: HighlightSpan = {
      id: Date.now(),
      start: Math.max(0, Math.min(start, pdfText.length)),
      end: Math.max(0, Math.min(end, pdfText.length)),
      typeId: type.id,
      color: type.color,
      text: pdfText.slice(start, end),
    };
    setSpansByType(prev => ({
      ...prev,
      [type.id]: [...(prev[type.id] ?? []), newSpan],
    }));
    window.getSelection()?.removeAllRanges();
  }

  function clearAllHighlights() {
    if (!confirm("Clear ALL highlights (all types)?")) return;
    const cleared: Record<string, HighlightSpan[]> = {};
    for (const t of HIGHLIGHT_TYPES) {
      cleared[t.id] = [];
      localStorage.removeItem(storageKeyForType(t.id));
    }
    setSpansByType(cleared);
  }

  function clearAll() {
    if (!confirm("Clear text and all highlights?")) return;
    setPdfText("");
    const cleared: Record<string, HighlightSpan[]> = {};
    for (const t of HIGHLIGHT_TYPES) {
      cleared[t.id] = [];
      localStorage.removeItem(storageKeyForType(t.id));
    }
    setSpansByType(cleared);
    localStorage.removeItem(STORAGE_TEXT_KEY);
  }

  const allSpans: HighlightSpan[] = Object.values(spansByType).flat();

  return (
      <div className="app">
        <header>
          <h1>Lorem Ipsum</h1>
          <p className="muted">Select text, then click one of the type buttons to create a highlight.</p>
        </header>
        <div>
          <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
          />
        </div>
        <section className="controls">
          <div className="type-buttons">
            {HIGHLIGHT_TYPES.map(t => (
                <button
                    key={t.id}
                    type="button"
                    className="type-btn"
                    style={{ "--type-color": t.color, "backgroundColor": t.color, "color": "#0f172a" } as React.CSSProperties}
                    onClick={() => addHighlightForType(t.id)}
                    disabled={!pdfText}
                    title={`Add highlight of type '${t.name}'`}
                >
                  {t.name}
                </button>
            ))}
          </div>

          <div className="reset-buttons">
            <button onClick={clearAllHighlights} disabled={!pdfText}>Clear All Highlights</button>
            <button onClick={clearAll}>Clear All Data</button>
          </div>
          {loading && <span className="loading">Loading PDF…</span>}
        </section>

        <main>
          <section className="text-area">
            <h2>Extracted Text</h2>
            <div className="text-box" aria-label="Extracted PDF text" ref={textRef}>
              {pdfText ? (
                  <HighlightedText text={pdfText} spans={allSpans}  showAllBorders borderWidth={1}/>
              ) : (
                  <div className="placeholder">No text yet. Upload a PDF.</div>
              )}
            </div>
          </section>
         <aside>
         <HighLights highlights={spansByType} />
         </aside>
        </main>
      </div>
  );
}