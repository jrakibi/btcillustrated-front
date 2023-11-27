export interface Illustration {
    id?: number; // '?' denotes that the field is optional (useful for new illustrations)
    title: string;
    thumbnailImage: string;
    imagePaths: string[];
    details: string;
    tags: Tag[];
    categories: Category[]; // Assuming categories are just strings
    metaTitle: string;
    metaDescription: string;
    slug: string;
    githubRepoUrl: string;
    tweetLink: string;
    reviews?: Review[]; // Optional, define Review interface if needed
    thumbnailLoaded?: boolean;

}

export interface Tag {
  id?: number;
  name: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface Review {
  id?: number; // Optional for new reviews
  author: string;
  content: string;
  rating: number; // Assuming rating is a numeric value
  createdDate?: Date; // Optional, could be set automatically by the backend
  // Add any other fields that are relevant for your review
}
