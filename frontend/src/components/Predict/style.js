import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.linen.main,
}));
