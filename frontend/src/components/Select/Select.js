import React from "react";
import { styled } from "@mui/material/styles";
import { Select as S } from "@mui/material";
import { theme } from "../../assets/global/Theme";

const Select = styled((props) => <S {...props} />)({
  "& .MuiSelect-select": {
    color: theme.palette.primary,
    fontSize: 18,
    fontWeight: theme.typography.fontWeightLight,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary,
  },
  "& .MuiSelect-select::-webkit-input-placeholder": {
    color: "#767e89",
    opacity: "1",
  },
});

export default Select;
