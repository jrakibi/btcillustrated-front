// Define the structure of the dialogue response expected from the backend
export interface DialogueResponse {
    keywords: string[];
    dialogue: MessagePair[];
  }
  
  export interface MessagePair {
    speaker: string;
    text: string;
  }
  

  // mind-mapper-response.model.ts

export interface MindMapperResponse {
  title: string;
  summary: string;
  details: Detail[];
}

export interface Detail {
  title: string;
  explanations: string[];
}
