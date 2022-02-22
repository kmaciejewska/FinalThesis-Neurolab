import React from "react";
import { experimentalStyled, Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeroSection from "../components/Hero/HeroSection";
import Header from "./Header";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
}));

export default function Layout() {
  return (
    <MainWrapper>
      <Header
        sx={{
          backgroundColor: "transparent",
          position: "absolute",
          paddingTop: "10px",
        }}
      />
      <HeroSection />
      <PageWrapper>
        <Container maxWidth={false} sx={{ marginTop: "20px" }}>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
