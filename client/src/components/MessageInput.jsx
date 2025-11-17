import React, { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    if (typeof onSend === "function") await onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-700"
        disabled={disabled}
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
