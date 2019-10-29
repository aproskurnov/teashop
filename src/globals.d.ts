declare module "*.png" {
    const value: any;
    export = value;
}

interface ICategory{
    id: number,
    title: string
}

interface IProduct {
    id: number,
    title: string,
    description: string,
    discount: number,
    price: number,
    new_product: boolean,
    favorite: boolean,
    image: string,
    rating: number,
    category: ICategory
}