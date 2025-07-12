export default interface CartItemType {
  id: string;
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  totalItems:number;
  itemTotal: number;
  prices: {
    price: number;
    originalPrice: number;
    discount: number;
  };
}