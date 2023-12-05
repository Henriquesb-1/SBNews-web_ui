export interface category {
    id: number; 
    name: string;
    createdBy: number;
    parentId?: number;
    newsCount?: number;
    parentCategory?: category;
}