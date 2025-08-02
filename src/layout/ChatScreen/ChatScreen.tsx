import { faker } from "@faker-js/faker";
import { useState } from "react";
import { ChatInput, ChatDisplay } from "../../components";
import { useChatStore } from "../../store/chatStore";

export const ChatScreen = () => {
  const { addMessage, conversations, currentId, updateTitle } = useChatStore();
  const [isThinking, setIsThinking] = useState(false);

  const currentConversation = conversations.find(
    (conv) => conv.id === currentId
  );
  const messages = currentConversation?.messages || [];

  const handleAIResponse = (convId: string | null) => {
    if (!convId) return;

    setIsThinking(true);
    setTimeout(() => {
      const aiText = faker.lorem.sentences({ min: 1, max: 3 });

      const aiMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        text: aiText,
      };

      addMessage(convId, aiMessage);
      updateTitleIfFirstMessage(convId, aiText);

      setIsThinking(false);
    }, 5000);
  };

  const updateTitleIfFirstMessage = (id: string, aiText: string) => {
    const conv = useChatStore.getState().conversations.find((c) => c.id === id);
    if (conv && conv.messages.length === 1) {
      const newTitle = aiText.split(".")[0].slice(0, 50).trim();
      updateTitle(id, newTitle || "New Conversation");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <div className="ml-16 w-full max-w-3xl">
            <ChatInput onUserMessageSent={handleAIResponse} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pb-4">
            <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-4">
              <ChatDisplay isThinking={isThinking} />
            </div>
          </div>

          <div className="sticky z-10 bottom-0 w-full max-w-3xl mx-auto px-4 md:px-8 pt-4 bg-white">
            <ChatInput onUserMessageSent={handleAIResponse} />
          </div>
        </>
      )}
    </div>
  );
};
