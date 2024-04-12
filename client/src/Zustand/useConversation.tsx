import create from "zustand";

interface ConversationState {
  selectedConversation: any; // Adjust the type according to your conversation object structure
  setSelectedConversation: (selectedConversation: any) => void; // Adjust the type according to your conversation object structure
  messages: any[]; // Adjust the type according to your message object structure
  setMessages: (messages: any[]) => void; // Adjust the type according to your message object structure
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
