export interface topNewsProps {
    id: number
    title: string;
    imageUrl: string;
}

export interface NewsRead {
    id: number;
    title: string;
    imageUrl: string;
    category: { id: number, name: string };
    dateCreated: string;
    author: string;
    content: string;
    visits?: number;
}

export interface News {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: { id: number, name: string };
    dateCreated: string;
    author: string;
    content: string;
    isVisible?: boolean;
    visits?: number;
    totalComments?: number
    categoryId?: number
}
