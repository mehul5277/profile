export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Slogan {
    id: number;
    text: string;
    title: string;
    subtitle: string;
    description?: string; // Optional field for additional details
    benefits?: string[]; // Optional field for listing benefits of the slogan
    brandValues?: string[]; // Optional field for associating brand values with the slogan
    businessImpact?: string; // Optional field for describing the business impact of the slogan
    buttonText?: string; // Optional field for call-to-action button text
    buttonLink?: string; // Optional field for call-to-action button link
    brandStory?: string; // Optional field for sharing the brand story behind the slogan
}