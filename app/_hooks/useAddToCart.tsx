import { useState } from "react";
import { useCart } from "react-use-cart";
import { notifyError, notifySuccess } from "@/app/_utils/toast";
import useUtilsFunction from "./useUtilsFunction";


const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();
  const { showingTranslateValue } = useUtilsFunction();


  const handleAddItem = (product:any) => {
    console.log("handleAddItem", product);
    const result = items.find((i) => i.id === product.id);
    const { slug ,categories, description, ...updatedProduct } = product;
    const newItem = {
          ...updatedProduct,
          title:  showingTranslateValue(product?.title),
          id: String(product._id),
          price: product.prices.price,
          originalPrice: product.prices?.originalPrice,
    };

    if (result !== undefined) {
      if ((result?.quantity ?? 0) + item <= (product?.stock)) {
        addItem(newItem, item);
        notifySuccess(`${item} ${(product?.title)} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    } else {
      if ( item <= (product?.stock) ) {
        addItem(newItem, item);
        notifySuccess(`${item} ${(product?.title)} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  const handleIncreaseQuantity = (product:any) => {
    const result = items?.find((p) => p._id === product._id);
    if (result) {
      if ( ((result?.quantity ?? 0) + item) <= (product?.stock) ) {
        updateItemQuantity(product._id, product.quantity + 1);
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;


