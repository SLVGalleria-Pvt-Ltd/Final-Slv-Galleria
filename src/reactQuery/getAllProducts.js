import { useQuery } from "@tanstack/react-query";
import getAllProductsApi from "../services/products/getAllProducts";

export function useQueryGetAllProducts() {
  const query = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getAllProductsApi(),
  });
  return query;
}
