export default function Sidebar({
  sessions,
  activeId,
  onSelect,
  onNew,
  collapsed,
  onToggleCollapse,
}) {
  return (
    <aside
      className={`flex flex-col border-r bg-gray-50 dark:bg-gray-900 \
        ${collapsed ? "w-14 sm:w-16" : "w-5/6 max-w-xs sm:w-72"} \
        fixed sm:static z-30 top-0 left-0 h-full sm:h-auto \
        transition-all duration-300 \
        ${collapsed ? "sm:block" : "block"} \
        sm:relative \
        ${collapsed && "hidden sm:flex"}
      `}
      style={{ minWidth: collapsed ? "3.5rem" : undefined }}
    >
      <div className="p-3 flex items-center justify-between">
        {!collapsed && <div className="text-lg font-semibold">Chats</div>}
        <div className="flex items-center gap-2">
          {collapsed ? (
            <button
              onClick={() => {
                onNew();
                // Collapse sidebar on mobile after new chat
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  onToggleCollapse();
                }
              }}
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
              title="New Chat"
            >
              +
            </button>
          ) : (
            <button
              onClick={() => {
                onNew();
                // Collapse sidebar on mobile after new chat
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  onToggleCollapse();
                }
              }}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              New Chat
            </button>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      <div className="overflow-auto p-2">
        {sessions && sessions.length ? (
          sessions.map((s) => (
            <div
              key={s.sessionId}
              onClick={() => {
                onSelect(s.sessionId);
                // Close sidebar on mobile after selection
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  onToggleCollapse();
                }
              }}
              className={`p-2 mb-2 rounded cursor-pointer ${
                s.sessionId === activeId
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-850 dark:hover:bg-gray-700"
              }`}
            >
              {!collapsed ? (
                <div>
                  <div className="font-medium truncate">
                    {s.title || s.sessionId}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {s.preview}
                  </div>
                </div>
              ) : (
                <div className="text-center font-semibold">
                  {(s.title || s.sessionId)[0]}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 p-2">No chats yet</div>
        )}
      </div>

      <div className="mt-auto p-3 border-t flex items-center justify-center sm:justify-start">
        {!collapsed && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="font-medium">User</div>
            <div className="text-xs">user@example.com</div>
          </div>
        )}
        {collapsed && (
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
              U
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
