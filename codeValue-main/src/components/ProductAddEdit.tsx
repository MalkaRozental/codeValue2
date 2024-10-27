import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useProduct } from "./ProductProvider";
import { TextField, Button, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProduct, editProduct } from "../redux/product";

interface ProductForm {
  name: string;
  description: string;
  price: number;
}
const ProductAddEditSchema = Yup.object().shape({
  name: Yup.string().max(30, "Too Long!").required("Required"),
  description: Yup.string().max(200, "Too Long!"),
  price: Yup.number().moreThan(0, "More than 0").required("Required"),
});

const textFieldStyle = { margin: "0 15px 15px 15px" };

export const ProductAddEdit = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addNewProduct,
    setAddNewProduct,
  } = useProduct();
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<ProductForm>({
    description: selectedProduct?.description ?? "",
    name: selectedProduct?.name ?? "",
    price: selectedProduct?.price ?? 0,
  });
  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
      } as ProductForm);
    }
  }, [selectedProduct]);
  const handleSubmitClick = (values: ProductForm) => {
    if (selectedProduct) {
      dispatch(
        editProduct({ editedProduct: values, productId: selectedProduct.id })
      );
      setSelectedProduct(undefined);
    } else {
      dispatch(addProduct(values));
      setAddNewProduct(false);
    }
  };
  return (
    <>
      <Card style={{ display: "flex", flexDirection: "column", width: "auto" }}>
        <img
          style={{ height: 80, width: 80 }}
          src="/codeValue.png"
          alt="image"
        />
        <Formik
          enableReinitialize
          validateOnBlur
          validationSchema={ProductAddEditSchema}
          initialValues={{
            ...product,
          }}
          onSubmit={(values) => handleSubmitClick(values)}
        >
          {({
            errors,
            touched,
            isValid,
            values,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <TextField
                fullWidth
                style={textFieldStyle}
                id="name"
                name="name"
                label="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="description"
                name="description"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  style={textFieldStyle}
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleSubmit()}
                  disabled={!isValid}
                >
                  {addNewProduct ? "Add" : "Edit"}
                </Button>
              </div>
            </>
          )}
        </Formik>
      </Card>
    </>
  );
};
