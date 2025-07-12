
export interface ProductType {
    quantity: number;
    id: string;
    _id: string;
    title: {};
    name?: string;
    category:any;
    categories:any;
    price: number;
    prices: {
        price: number;  
        originalPrice: number;  
        discount: number;  
    };
    originalPrice?: number;
    image?: any;
    slug?: string;
    description?: string;

  }
  