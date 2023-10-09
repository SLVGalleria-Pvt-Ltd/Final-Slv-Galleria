import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getallcategoryApi from "../services/category/getAllCategory";
import AddNewCategoryApi from "../services/category/createCategory";
import deleteCategoryApi from "../services/category/deleteCategory";
import updateCategoryApi from "../services/category/updateCategory";

export function useQueryGetAllCategories() {
  const query = useQuery({
    queryKey: ["all-categoties"],
    queryFn: () => getallcategoryApi(),
  });
  return query;
}

export function useMutationCreateCategory() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => AddNewCategoryApi(props),
    queryKey: ["create-category"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-categoties"]);
    },
  });
  return query;
}

export function useMuatationUpdateCategory() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => updateCategoryApi(props),
    queryKey: ["update-category"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-categoties"]);
    },
  });
  return query;
}

export function useMutationDeleteCategory() {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (props) => deleteCategoryApi(props),
    queryKey: ["delete-category"],
    onSuccess: () => {
      queryClient.invalidateQueries(["all-categoties"]);
    },
  });
  return query;
}
