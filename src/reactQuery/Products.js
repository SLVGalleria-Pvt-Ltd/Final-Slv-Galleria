import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getAllProductsApi from "../services/products/getAllProducts";
import getSingleProductApi from "../services/products/getSingleProduct ";
import createproductapi from "../services/products/createproduct";
import deleteProductsApi from "../services/products/deleteProduct";
import updateProductApi from "../services/products/updateProduct";

export function useQueryGetAllProducts() {
  const query = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getAllProductsApi(),
  });
  return query;
}

export function useQueryGetSingleProduct({ slug }) {
  const query = useQuery({
    queryKey: ["single-products"],
    queryFn: () => getSingleProductApi({ slug }),
  });
  return query;
}

export function useMutationCreateProduct() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => createproductapi(props),
    queryKey: ["create-product"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
    },
  });
  return query;
}

export function useMuatationUpdateProduct() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => updateProductApi(props),
    queryKey: ["update-product"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
    },
  });
  return query;
}

export function useMutationDeleteProduct() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => deleteProductsApi(props),
    queryKey: ["delete-product"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
    },
  });
  return query;
}
