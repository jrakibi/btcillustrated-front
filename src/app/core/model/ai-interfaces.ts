// Define the structure of the dialogue response expected from the backend
export interface DialogueResponse {
    keywords: string[];
    dialogue: MessagePair[];
  }
  
  export interface MessagePair {
    speaker: string;
    text: string;
  }
  