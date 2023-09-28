export interface Illustration {
    id?: number; // The question mark denotes that the property is optional.
    title?: string;
    thumbnailImage?: string;
    imagePaths?: string[];
    details?: string;
    thumbnailLoaded?: boolean;
  }
  