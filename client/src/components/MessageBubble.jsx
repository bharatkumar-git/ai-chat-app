import { useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

function TableRenderer({ description, table }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm">
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {table.columns.map((c, i) => (
                <th key={i} className="px-3 py-1 text-left font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="border-t">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {description && (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [feedback, setFeedback] = useState(null); // 'like' | 'dislike' | null

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        } max-w-[80%] p-3 rounded`}
      >
        {message.type === "table" ? (
          <TableRenderer
            description={message.description}
            table={message.table}
          />
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}

        {!isUser && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setFeedback(feedback === "like" ? null : "like")}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Like"
            >
              {feedback === "like" ? (
                <AiFillLike className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AiOutlineLike className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <button
              onClick={() =>
                setFeedback(feedback === "dislike" ? null : "dislike")
              }
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Dislike"
            >
              {feedback === "dislike" ? (
                <AiFillDislike className="w-5 h-5 text-red-600 dark:text-red-400" />
              ) : (
                <AiOutlineDislike className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
