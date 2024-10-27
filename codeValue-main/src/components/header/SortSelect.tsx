import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { sortProductsByKey } from "../../redux/product";
import { Product } from "../../type";

export const SortSelect = () => {
  const dispatch: AppDispatch = useDispatch();

  const [sortBy, setSortBy] = useState("name");
  const handleChangeSortBy = (key: string) => {
    dispatch(sortProductsByKey({ key: key as keyof Product }));
    setSortBy(key);
  };

  return (
    <FormControl fullWidth sx={{ minWidth: "10vw" }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        id="sort-by-select"
        value={sortBy}
        onChange={(e) => handleChangeSortBy(e.target.value)}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="creationDate">Creation Date</MenuItem>
      </Select>
    </FormControl>
  );
};
