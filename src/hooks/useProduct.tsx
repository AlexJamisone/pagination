import { useEffect, useState } from "react";
type Product = {
  id: string;
  product: string;
  brand: string;
  price: number;
};

const useProduct = (currentPage: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        console.log(currentPage);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getProduct();
  }, [currentPage]);
  return { products, isLoading };
};
export default useProduct;
