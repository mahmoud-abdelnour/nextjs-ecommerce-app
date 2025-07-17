'use client';
import ProductServices from '@/app/_services/ProductService';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/app/_components/products/ProductCard/ProductCard';



interface OrdersResponse {
  products?: any[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const _id = searchParams.get('_id');

  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery<OrdersResponse>({
    queryKey: ['search', _id, query],

    queryFn: () =>
        ProductServices.getShowingStoreProducts({
            category: _id ? _id : "",
            title: query ? encodeURIComponent(query) : "",
        }),
    staleTime: 0,
  });

  if (isLoading) {
    return <div className='text-center'>Loading search results...</div>;
  }


  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        {error instanceof Error ? error.message : 'Failed to fetch orders'}
      </div>
    );
  }


  return (

       <>
       <section className="product-tabs section-padding position-relative">
              <div className="container">
                    <div className="section-title style-2 wow animate__animated animate__fadeIn">
                      {/* <h3> Products</h3> */}
                    </div>
                    <div className="row product-grid-4">
                          {data?.products && data.products.map((product: any, index: number) => (
                                <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={index*5}>
                                  
                                  <ProductCard
                                    key={index}
                                    product={product}
                                  />
                                </div>
                          ))}
                    </div>
              </div>
            </section>
    </>
    
   
  );
}