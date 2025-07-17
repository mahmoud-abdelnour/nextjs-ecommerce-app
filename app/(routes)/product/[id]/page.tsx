
import { ProductType } from '@/app/_types/product';
import ProductContent from './ProductContent';
import ProductServices from "@/app/_services/ProductService";


interface GetDataResponse {
  product: ProductType;
  relatedProducts: ProductType[];
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;

  const { product, relatedProducts } = await fetchProductById(id);

  return (
       <ProductContent 
        product={product}
        relatedProducts={relatedProducts}
    />
  );
}


async function fetchProductById(slug: string): Promise<GetDataResponse> {
  try {
    const data = await ProductServices.getShowingStoreProducts({
      category: "",
      slug: slug,
    });
    
    const product = data?.products?.find((p: ProductType) => p.slug === slug);
    
    return {
      product: product || {} as ProductType,
      relatedProducts: data?.relatedProducts || [],
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      product: {} as ProductType,
      relatedProducts: [],
    };
  }
}