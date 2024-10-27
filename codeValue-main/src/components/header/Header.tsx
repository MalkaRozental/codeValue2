import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { SortSelect } from "./SortSelect";
import { useProduct } from "../ProductProvider";
import { Search } from "./Search";

export const Header = () => {
  const { setAddNewProduct } = useProduct();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Store
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack
        spacing={2}
        direction="row"
        sx={{ alignItems: "center", padding: 4 }}
      >
        <Stack>
          <Button variant="contained" onClick={() => setAddNewProduct(true)}>
            Add Product
          </Button>
          ;
        </Stack>
        <Stack sx={{ minWidth: 0 }}>
          <SortSelect />
        </Stack>
        <Search />
      </Stack>
    </>
  );
};
