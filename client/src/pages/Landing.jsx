import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing({ onNewChat }) {
  const navigate = useNavigate();

  const startNew = async () => {
    // onNewChat expects navigate to be passed in some calls
    if (typeof onNewChat === "function") {
      await onNewChat(navigate);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome</h2>
      <p className="mb-6 max-w-md text-gray-600 dark:text-gray-300">
        This is a simplified ChatGPT-style demo. Start a new chat to ask a
        question and receive a mock structured (table) response.
      </p>
      <button
        onClick={startNew}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        New Chat
      </button>
    </div>
  );
}
