export interface Message {
  id: string;
  author: string;
  article: string;
  prompt: string;
  system: string;
  aiModel: string;
  timestamp: Date;
  results?: string;
  rating?: number;
  success?: boolean;
  errors?: any;
}
