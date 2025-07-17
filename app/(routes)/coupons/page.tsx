
import Image from 'next/image';
import CouponContent from './CouponContent';
import CouponService from '@/app/_services/CouponService';

interface GetDataResponse {
  coupons: any;
}

async function getData(): Promise<GetDataResponse> {
  try {
    const data = await  CouponService.getShowingCoupons();

    return {
      coupons: data || {} as any,
    };
  } catch (error) {
      console.error("Error fetching product data:", error);
    return {
      coupons: {} as any,
    };
  }
}


async function Coupon() {
  const { coupons  } = await getData();
  return (
      <main className="main">
          <div className="container mb-80 mt-50">
              <div className="row">
                <CouponContent 
                  coupons={coupons}
                />
                </div>
          </div>
      </main>
    )
}

export default Coupon
