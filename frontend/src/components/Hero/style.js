import { Container as C, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import img from "../../assets/images/background.png";

export const Section = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "90vh",
  background: theme.palette.linen.main,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

export const Content = styled(Grid)(() => ({
  height: "100%",
  zIndex: 100,
  position: "relative",
}));

export const Container = styled(C)(() => ({
  height: "100%",
}));

export const GradientText = styled("p")(() => ({
  margin: 0,
  display: "flex",
  background:
    "-webkit-linear-gradient(45deg, rgba(196,30,61,1) 0%, rgba(191,51,77,1) 35%, rgba(200,133,145,1) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));
