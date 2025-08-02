import "./Sidebar.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useChatStore } from "../../store/chatStore";
import { toast } from "react-toastify";

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const {
    conversations,
    deleteConversation,
    updateTitle,
    currentId,
    setCurrentId,
    createConversation,
  } = useChatStore();

  const handleMouseEnter = () => {
    if (!isPinned) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) setIsExpanded(false);
  };

  const togglePinned = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    setIsExpanded(newPinned);
  };

  const getMenuTooltip = () => {
    if (isExpanded && isPinned) return "Collapse menu";
    if (isExpanded && !isPinned) return "Keep menu expanded";
    return "Expand menu";
  };

  const saveEdit = () => {
    if (editingId) {
      updateTitle(editingId, editedTitle);
      setEditingId(null);
      toast.success(
        `Conversation titled "${editedTitle}" - renamed successfully`,
        { autoClose: 2000, position: "bottom-right" }
      );
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`sidebar-container ${isExpanded ? "w-64" : "w-20"}`}
    >
      <div className="flex items-center justify-between p-4">
        <Tooltip text={getMenuTooltip()} position="right">
          <button
            onClick={togglePinned}
            className="btn-icon"
            aria-label={getMenuTooltip()}
          >
            <MenuIcon fontSize="small" />
          </button>
        </Tooltip>
      </div>

      <div className="p-2">
        <Tooltip text={"New Chat"} position="bottom">
          <button
            className="btn-new-chat"
            aria-label="New Chat"
            onClick={() => {
              const newMessage = {
                id: Date.now().toString(),
                role: "user" as const,
                text: "",
                timeStamp: "",
              };
              const fakeTitle = "New Chat";
              createConversation(fakeTitle, newMessage);
            }}
          >
            <EditSquareIcon />
            {isExpanded && <span>New Chat</span>}
          </button>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {isExpanded && <h2 className="section-heading">Recent</h2>}
        <ul className="mt-1">
          {conversations.map((conv) => (
            <Tooltip text={conv.title} position="bottom" key={conv.id}>
              <li
                className={`group list-item relative ${
                  currentId === conv.id ? "bg-[#d3e3fd]" : "hover:bg-gray-200"
                }`}
                onClick={() => setCurrentId(conv.id)}
              >
                {editingId === conv.id ? (
                  <input
                    className="w-full text-sm px-2 py-1 rounded"
                    value={editedTitle}
                    onChange={(e) => {
                      setEditedTitle(e.target.value);
                    }}
                    onBlur={saveEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <>
                    <span
                      className={`${
                        !isExpanded ? "hidden" : ""
                      } hidden-when-collapsed`}
                    >
                      {conv.title}
                    </span>
                    {isExpanded && (
                      <button
                        className="invisible group-hover:visible"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuIndex((prev) =>
                            prev === conv.id ? null : conv.id
                          );
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </button>
                    )}
                    {openMenuIndex === conv.id && (
                      <div className="absolute top-full right-0 mt-1 bg-white border rounded shadow-md z-50 flex flex-col text-sm">
                        <button
                          onClick={() => {
                            setEditingId(conv.id);
                            setEditedTitle(conv.title);
                            setOpenMenuIndex(null);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2"
                        >
                          <EditIcon fontSize="small" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteConversation(conv.id);
                            toast.warn(
                              `Conversation titled ${conv.title} - deleted successfully`,
                              { autoClose: 2000, position: "bottom-right" }
                            );
                          }}
                          className="px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2 text-red-500"
                        >
                          <DeleteIcon fontSize="small" /> Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
  );
};

const positionClasses = {
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
};

const Tooltip = (props: {
  children: any;
  text: any;
  position: keyof typeof positionClasses;
}) => {
  return (
    <div className="relative group">
      {props.children}
      <div className={`tooltip-content ${positionClasses[props.position]}`}>
        {props.text}
      </div>
    </div>
  );
};
