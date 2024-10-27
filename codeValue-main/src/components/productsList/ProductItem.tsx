import { Stack, Typography, Paper, styled, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useProduct } from "../ProductProvider";
import { deleteProduct } from "../../redux/product";
import { AppDispatch } from "../../redux/store";
import { Product } from "../../type";

export const ProductItem = ({ product }: { product: Product }) => {
  const dispatch: AppDispatch = useDispatch();

  const { setSelectedProduct } = useProduct();

  const handleDeleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteProduct({ productId: product.id }));
  };

  return (
    <Item
      key={product.id}
      sx={{ my: 1, mx: "auto", p: 2 }}
      onClick={() => {
        setSelectedProduct(product);
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack>
          <img style={{ height: 80 }} src="/codeValue.png" alt="image" />
        </Stack>
        <Stack sx={{ minWidth: 0, cursor: "pointer" }}>
          <Typography noWrap>{product.name}</Typography>
          <Typography noWrap>{product.description}</Typography>
        </Stack>
        <Stack spacing={4} direction="row" sx={{ alignItems: "end" }}>
          <Button onClick={handleDeleteProduct}>Delete</Button>
        </Stack>
      </Stack>
    </Item>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
