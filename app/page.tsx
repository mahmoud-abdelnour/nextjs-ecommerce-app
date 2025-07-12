import Image from "next/image";
import FeaturedCategories from "./_components/categories/FeaturedCategories";
import HomeBanner from "./_components/banners/HomeBanner";
import HomeCategories from "./_components/categories/HomeCategories";
import PopularProducts from "./_components/products/PopularProducts/PopularProducts";

import { WishlistProvider } from "./_context/WishlistContext";

export default function Home() {
  return (
      <>
        <HomeBanner/>
        <FeaturedCategories/>
        <HomeCategories/>
        <PopularProducts/>
      </>
  );
}
