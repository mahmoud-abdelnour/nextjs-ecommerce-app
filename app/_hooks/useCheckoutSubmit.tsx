
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { useQuery } from "@tanstack/react-query";


import { getUserSession } from "@/app/_lib/auth";
import { GlobalContext } from "@/app/_context/GlobalContext";
import OrderServices from "@/app/_services/OrderService";
import useUtilsFunction from "./useUtilsFunction";
import CouponService from "@/app/_services/CouponService";
import { notifyError, notifySuccess } from "@/app/_utils/toast";
import CustomerServices from "@/app/_services/CustomerServices";
import CartItemType from "../_types/cartItem";

const useCheckoutSubmit = () => {
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);
    const [couponInfo, setCouponInfo] = useState<CouponInfo | null>({});
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState<{ type?: string; value?: number }>({});
    const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [useExistingAddress, setUseExistingAddress] = useState(false);
    const [isCouponAvailable, setIsCouponAvailable] = useState(false);
    const router = useRouter();
    const couponRef = useRef<HTMLInputElement>(null);
    const { isEmpty, items, cartTotal, emptyCart ,totalItems} = useCart() as unknown as { items: CartItemType[]; isEmpty: boolean; cartTotal: number; emptyCart: () => void; totalItems: number };


    interface CouponInfo {
        couponCode?: string;  
    }
  

    type UserSession = {
        id?: string;
        name?: string | null;
        lastName?: string | null;
        email?: string | null;
        image?: string | null;
        streetAddress?: string;
        cityAddress?: string;
        city?: string | null;
        phone?: string | null;
    };
 
    const userInfo = getUserSession() as UserSession;

    const { showDateFormat, currency, globalSetting } = useUtilsFunction();

    const { data, isLoading } = useQuery({
      queryKey: ["shippingAddress", { id: userInfo?.id }],
      queryFn: async () =>{
        if (!userInfo?.id) return null; 
        return  await CustomerServices.getShippingAddress({
            userId: userInfo?.id,
            });
      },
      select: (data) => data?.shippingAddress,
    enabled: !!userInfo?.id,  
    });

    const hasShippingAddress =  !isLoading && data && Object.keys(data)?.length > 0;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm();






    useEffect(() => {
        const couponStr = Cookies.get("couponInfo");
        if (couponStr) {
            const coupon = JSON.parse(couponStr);


            setCouponInfo(coupon);
            setDiscountPercentage({
                type: coupon.discountType?.type,
                value: coupon.discountType?.value,
            });
            setMinimumAmount(coupon.minimumAmount);
        }
        //setValue("email", userInfo?.email);
    }, [isCouponApplied]);




    useEffect(() => {
        const discountProductTotal = items?.reduce((preValue, currentValue) => preValue + currentValue.itemTotal, 0);

        let totalValue = 0;
        const subTotal = (cartTotal + Number(shippingCost)).toFixed(2);

        const discountAmount =
        discountPercentage?.type === "fixed"
            ? discountPercentage?.value
            : discountProductTotal * ((discountPercentage?.value ?? 0) / 100);

        const discountAmountTotal = discountAmount ? discountAmount : 0;

        totalValue = Number(subTotal) - discountAmountTotal;

        setDiscountAmount(discountAmountTotal);

        setTotal(totalValue);
    }, [cartTotal, shippingCost, discountPercentage]);




    const submitHandler = async (data: any) => {
       
        try {
    
            setIsCheckoutSubmit(true);
            setError("");

            const userDetails = {
                name: `${data.firstName}`,
                lastName: `${data.lastName}`,
                contact: data.phone,
                email: data.email,
                address: data.streetAddress,
                city: data.cityAddress,
                password: data.password,
            };

            let orderInfo = {
                user_info: userDetails,
                shippingOption: data.shippingOption,
                paymentMethod: data.paymentMethod,
                status: "Pending",
                cart: items,
                subTotal: cartTotal,
                shippingCost: shippingCost,
                discount: discountAmount,
                total: total,
            };



             
            try {
                const orderResponse = await OrderServices.addOrder(orderInfo,"");
                await handleOrderSuccess(orderResponse, orderInfo);
            } catch (err) {
                if (err instanceof Error) {
                    console.error("Cash payment error:", err.message);
                    throw new Error(err.message);
                } else {
                    console.error("Cash payment error:", err);
                    throw new Error("An unknown error occurred during cash payment.");
                }
            } 

        } catch (error: any) {
            notifyError(error?.response?.data?.message || error?.message);
            setIsCheckoutSubmit(false);
        }
    };



    const handleOrderSuccess = async (orderResponse:any, orderInfo:any) => {
        try {

            // Proceed with order success
            router.push(`user/order/${orderResponse?._id}`);
            notifySuccess(
                "Your Order Confirmed! The invoice will be emailed to you shortly."
            );
            Cookies.remove("couponInfo");
            emptyCart();
            setIsCheckoutSubmit(false);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Order success handling error:", err.message);
                throw new Error(err.message);
            } else {
                console.error("Order success handling error:", err);
                throw new Error("Unknown error occurred during order success handling.");
            }
        }
    };

    

    const handleShippingCost = (value: any) => {
        setShippingCost(Number(value));
    };

    
    const handleCouponCode = async (e: any) => {
        e.preventDefault();
        
        if (!couponRef.current?.value) {
            notifyError("Please Input a Coupon Code!");
            return;
        }

        setIsCouponAvailable(true);

        try {
            const coupons = await CouponService.getShowingCoupons();
            const result = coupons.filter(
                (coupon:any) => coupon.couponCode === couponRef.current?.value
            );
            
            setIsCouponAvailable(false);

            if (result.length < 1) {
                notifyError("Please Input a Valid Coupon!");
                return;
            }

            if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
                notifyError("This coupon is not valid!");
                return;
            }

            if (total < result[0]?.minimumAmount) {
                notifyError(
                `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
                );
                return;
            } else {
                notifySuccess(
                `Your Coupon ${result[0].couponCode} is Applied on ${result[0].productType}!`
               );
                setDiscountPercentage({
                    type: result[0].discountType,
                    value: result[0].value,
                }   );
                setIsCouponApplied(true);
                setMinimumAmount(result[0]?.minimumAmount);
                setDiscountPercentage(result[0].discountType);
                Cookies.set("couponInfo", JSON.stringify(result[0]));
            }
        } catch (error) {
            if (error instanceof Error) {
                return notifyError(error.message);
            } else {
                return notifyError("An unknown error occurred.");
            }
        }
    };


    return {
        watch,
        errors,
        showCard,
        error,
        couponInfo,
        couponRef,
        total,
        isEmpty,
        items,
        cartTotal,
        totalItems,
        discountPercentage,
        discountAmount,
        shippingCost,
        isCheckoutSubmit,
        isCouponApplied,
        useExistingAddress,
        hasShippingAddress,
        isCouponAvailable,
        userInfo,
        setValue,
        handleSubmit,
        register,
        setShowCard,
        submitHandler,
        handleShippingCost,
        handleCouponCode,
    };
};

export default useCheckoutSubmit;