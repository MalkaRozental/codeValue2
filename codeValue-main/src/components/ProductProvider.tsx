import { ReactNode, createContext, useContext, useState } from "react";
import { Product } from "../type";
interface ProductContextType {
  selectedProduct: Product | undefined;
  setSelectedProduct: (value: Product | undefined) => void;
  addNewProduct: boolean | undefined;
  setAddNewProduct: (value: boolean) => void;
  query: string;
  setQuery: (value: string) => void;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [addNewProduct, setAddNewProduct] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        addNewProduct,
        setAddNewProduct,
        query,
        setQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
