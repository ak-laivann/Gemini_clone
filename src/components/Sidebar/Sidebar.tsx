import "./Sidebar.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const conversations = [
  "Understanding React: A JavaScript Library",
  "Pneumatic Systems Explained",
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

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
          <button className="btn-new-chat" aria-label="New Chat">
            <EditSquareIcon />
            {isExpanded && <span>New Chat</span>}
          </button>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {isExpanded && <h2 className="section-heading">Recent</h2>}
        <ul className="mt-1">
          {conversations.map((conv, idx) => (
            <Tooltip text={conv} position="bottom" key={idx}>
              <li className="group list-item hover:bg-gray-200">
                <span
                  className={`${
                    !isExpanded ? "hidden" : ""
                  } hidden-when-collapsed`}
                >
                  {conv}
                </span>
                {isExpanded && (
                  <button
                    className="invisible group-hover:visible"
                    aria-label="Conversation Options"
                    title="More options"
                  >
                    <MoreVertIcon fontSize="small" />
                  </button>
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
