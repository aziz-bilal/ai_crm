export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error: string | null;
}

export interface AuthCredentials {
  tenantId: string;
  apiKey: string;
}

export interface AuthToken {
  token: string;
  tenantId: string;
}

export interface DashboardStats {
  messagesUsed: number;
  messagesQuota: number;
  activeConversations: number;
  pendingHandoffs: number;
  enabledChannels: string[];
}

export interface Conversation {
  sessionId: string;
  channel: string;
  lastMessage: string;
  lastMessageTime: string;
  intent: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
  status: 'AI_ACTIVE' | 'HUMAN_ACTIVE' | 'CLOSED';
  language?: string;
}

export interface Message {
  id: string;
  sessionId: string;
  sender: 'user' | 'ai' | 'human';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ConversationDetail {
  sessionId: string;
  channel: string;
  status: 'AI_ACTIVE' | 'HUMAN_ACTIVE' | 'CLOSED';
  messages: Message[];
  metadata: {
    intent?: string;
    sentiment?: string;
    urgency?: string;
    language?: string;
    entities?: Record<string, any>;
  };
}

export interface Handoff {
  id: string;
  sessionId: string;
  channel: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved';
  lastMessage: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  availability: boolean;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AISettings {
  greetingPrompt: string;
  productPrompt: string;
  orderPrompt: string;
  supportPrompt: string;
  intentClassifierPrompt: string;
}

export interface Usage {
  used: number;
  limit: number;
  remaining: number;
}
