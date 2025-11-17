import { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const submit = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    if (typeof onSend === "function") await onSend(text.trim());
    setText("");
    // Refocus input after sending
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
