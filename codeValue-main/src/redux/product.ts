import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../type";

interface ProductsListInterface {
  products: Product[];
}
const initialState: ProductsListInterface = {
  products: [
    {
      id: 1,
      name: "product 1",
      description: "product 1 description",
      price: 45,
      creationDate: new Date("2023-08-01"),
    },
    {
      id: 2,
      name: "product 2",
      description: "product 2 description",
      price: 45,
      creationDate: new Date("2023-06-01"),
    },
    {
      id: 3,
      name: "product 3",
      description: "product 3 description",
      price: 45,
      creationDate: new Date("2025-01-01"),
    },
    {
      id: 4,
      name: "product 4",
      description: "product 4 description",
      price: 45,
      creationDate: new Date("2024-01-01"),
    },
  ],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, { payload: { name, description, price } }) => {
      state.products.push({
        id: state.products[state.products.length - 1].id + 1,
        name,
        description,
        price,
        creationDate: new Date(),
      });
    },
    deleteProduct: (state, { payload: { productId } }) => {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    editProduct: (state, { payload: { editedProduct, productId } }) => {
      state.products = state.products.map((product) =>
        product.id === productId ? { ...product, ...editedProduct } : product
      );
    },
    sortProductsByKey(state, action: PayloadAction<{ key: keyof Product }>) {
      const { key } = action.payload;
      state.products.sort((a, b) => (a[key] < b[key] ? -1 : 1));
    },
  },
});
export const { addProduct, deleteProduct, editProduct, sortProductsByKey } =
  productSlice.actions;
export default productSlice.reducer;
