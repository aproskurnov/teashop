declare module '*.png' {
  const value: string;
  export = value;
}

interface Category {
  id: number;
  title: string;
}

interface Price {
  min: number;
  max: number;
}

interface ProductResp {
  data: ProductData[];
  price: Price;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  discount: number;
  price: number;
  new_product: boolean;
  favorite: boolean;
  image: string;
  rating: number;
  category: Category;
}

interface FilterData {
  green: boolean;
  red: boolean;
  white: boolean;
  puer: boolean;
  price: number[];
  min: number;
  max: number;
  new_product: boolean;
  discount: boolean;
  search: string;
}
