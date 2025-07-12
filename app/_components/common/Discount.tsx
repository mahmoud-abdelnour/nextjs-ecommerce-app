import useUtilsFunction from "@/app/_hooks/useUtilsFunction";
import { ProductType } from "@/app/_types/product";


interface DiscountProps {
  discount?: number;
  product:ProductType;
  slug?: boolean;
  modal?: boolean;
  showPercentage?: boolean;
}

const Discount = ({ discount, product, slug, modal,showPercentage }: DiscountProps) => {
  const { getNumber,showingTranslateValue } = useUtilsFunction();

  const price = getNumber(product?.prices?.price);
  const originalPrice = getNumber(product?.prices?.originalPrice);

  const discountPercentage = getNumber(
    ((originalPrice - price) / originalPrice) * 100
  );


  return (
    <>
        {discount && ! showPercentage &&  discount   > 1 && (
            <span
                className="save-price font-md color3 ml-15">
                {discount} Off
            </span>
        )}
        {showPercentage && discountPercentage > 1 && (
            <span className="save-price font-md color3 ml-15">
                {discountPercentage}% Off
            </span>
        )}
    </>
  );
};

export default Discount;
