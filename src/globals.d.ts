declare module "*.png" {
    const value: any;
    export = value;
}

interface ICategory{
    id: number,
    title: string
}

interface IPrice{
    min:number,
    max:number
}

interface IProductResp{
    data: IProduct[],
    price: IPrice
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

interface IFilter{
    green: boolean,
    red: boolean,
    white: boolean,
    puer: boolean,
    price: number[],
    min: number,
    max: number,
    new_product: boolean,
    discount: boolean,
    search: string
}