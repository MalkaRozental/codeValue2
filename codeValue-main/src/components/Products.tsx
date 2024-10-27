import { Stack } from "@mui/material";
import { ProductList } from "./productsList/ProductList";
import { ProductAddEdit } from "./ProductAddEdit";
import { useProduct } from "./ProductProvider";

export const Products = () => {
  const { addNewProduct, selectedProduct } = useProduct();
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <ProductList />
      {(addNewProduct || selectedProduct) && <ProductAddEdit />}
    </Stack>
  );
};
