import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import logo from "../assets/images/logo.png";

const Header = ({ sx }) => {
  return (
    <AppBar sx={sx} elevation={0}>
      <Toolbar>
        <img src={logo} alt="NeuroLab" height={70} width={130} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
