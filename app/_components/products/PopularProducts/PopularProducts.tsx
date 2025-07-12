
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductServices from "@/app/_services/ProductService";
import { ProductType } from '@/app/_types/product';



const PopularProductsComponent: React.FC = async () => {

  const [data] = await Promise.all([
    ProductServices.getShowingStoreProducts({
     
    }),
  ]);

  const { popularProducts, discountProducts }: { 
    popularProducts: ProductType[]; 
    discountProducts: ProductType[] 
  } = data;


  return (
    <>
     <section className="product-tabs section-padding position-relative">
        <div className="container">
              <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Popular Products</h3>
              </div>

              
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab-one"
                  role="tabpanel">
                  <div className="row product-grid-4">

                     {popularProducts
                          ?.slice(
                            0,
                            50
                          )
                          .map((product,index) => (
                            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={index*5}>
                            <ProductCard
                              key={index}
                              product={product}
                            />
                            </div>
                          ))}

                
                  </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};



export default PopularProductsComponent;







