import { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const { conversations, setCurrentId } = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(conversations);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (!searchTerm) {
      setSearchResults(conversations);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceTimeoutRef.current = setTimeout(() => {
      const filtered = conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 3000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm, conversations]);

  const handleTitleClick = (id: string) => {
    setCurrentId(id);
    navigate(`/app/${id}`);
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 flex mt-32 justify-center px-4 md:px-8">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <input
            type="text"
            className="w-full px-5 py-3 text-lg rounded-full border border-gray-300 shadow-md transition duration-200"
            placeholder="Search for chat title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <div className="w-full mt-6 bg-white rounded-lg shadow-md border border-gray-200 max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-4">
                  <Skeleton
                    active
                    paragraph={{ rows: 3, width: [300, 200, 300] }}
                  />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => handleTitleClick(conv.id)}
                  >
                    <span className="text-gray-800 font-medium truncate">
                      {conv.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
