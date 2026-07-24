import { useRef, useState } from "react";

type Props = {
  onSend: (text: string) => void;
  onUpload?: (file: File) => void;
};

export default function ChatInput({ onSend, onUpload }: Props) {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const send = () => {
    const value = text.trim();
    if (!value) return;

    onSend(value);
    setText("");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    onUpload?.(file);

    // allow uploading same file again
    e.target.value = "";
  };

  return (
    <div className="border-t border-slate-200 bg-white px-5 py-4">
      <div className="flex items-end gap-3">

        {onUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileChange}
            />

            <button
              type="button"
              title="Upload PDF"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-lg transition hover:bg-slate-100"
            >
              📎
            </button>
          </>
        )}

        <textarea
          rows={1}
          value={text}
          placeholder="Ask AIVOA Copilot..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="max-h-40 flex-1 resize-none rounded-2xl border border-slate-300 px-5 py-3 text-sm outline-none transition focus:border-indigo-500"
        />

        <button
          onClick={send}
          disabled={!text.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          ➤
        </button>
      </div>

      <div className="mt-2 text-center text-xs text-slate-400">
        AI can update Customer, Product, Batch, Quantity and Risk directly from chat or from a PDF.
      </div>
    </div>
  );
}