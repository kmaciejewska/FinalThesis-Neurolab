import { styled } from "@mui/material/styles";
import { Tooltip as T, tooltipClasses } from "@mui/material";
import { theme } from "../../assets/global/Theme";

export const Tooltip = styled(({ className, ...props }) => (
  <T {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    backgroundColor: theme.palette.lightViolet.main,
  },
});
