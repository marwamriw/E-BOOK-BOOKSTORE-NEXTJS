export interface bookType{
    id?: string ;
    _id?:string;
    title:string;
    author:string;
    summary:string;
    pages:number;
    featured:boolean,
    category:string,
    language:string;
    price: string;
    coverImage?: string; 
    file?: string;
}