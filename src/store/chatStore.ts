import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../components/MessageBubble";

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

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  currentId: null,

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
        currentId: state.currentId === conversationId ? null : state.currentId,
      };
    });
  },

  setCurrentId: (id) => set({ currentId: id }),
}));
