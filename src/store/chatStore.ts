import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../components/MessageBubble";
import { generateMockConversation } from "./chatUtils";

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

interface ChatStore {
  conversations: Conversation[];
  currentId: string | null;
  createConversation: (title: string, firstMessage: Message) => string;
  addMessage: (conversationId: string, msg: Message) => void;
  updateTitle: (conversationId: string, newTitle: string) => void;
  deleteConversation: (conversationId: string) => void;
  setCurrentId: (id: string) => void;
}

const mockConversation = generateMockConversation();
const mockInitialState = {
  conversations: [mockConversation],
  currentId: mockConversation.id,
};

export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      ...mockInitialState,

      createConversation: (title, firstMessage) => {
        const id = uuidv4();
        const newConv = {
          id,
          title,
          messages: [firstMessage],
        };
        set((state) => ({
          conversations: [newConv, ...state.conversations],
          currentId: id,
        }));

        return id;
      },

      addMessage: (conversationId, msg) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? { ...conv, messages: [...conv.messages, msg] }
              : conv
          ),
        }));
      },

      updateTitle: (conversationId, newTitle) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId ? { ...conv, title: newTitle } : conv
          ),
        }));
      },

      deleteConversation: (conversationId) => {
        set((state) => {
          const updated = state.conversations.filter(
            (c) => c.id !== conversationId
          );
          return {
            conversations: updated,
            currentId:
              state.currentId === conversationId ? null : state.currentId,
          };
        });
      },

      setCurrentId: (id) => set({ currentId: id }),
    }),
    {
      name: "gemini-clone-chat-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        if (!state?.conversations || state.conversations.length === 0) {
          return (s) => {
            if (s) {
              s.conversations = [mockConversation];
              s.currentId = mockConversation.id;
            }
          };
        }
      },
    }
  )
);
