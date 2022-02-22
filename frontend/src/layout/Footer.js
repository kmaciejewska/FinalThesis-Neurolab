import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">
      &copy; {new Date().getFullYear()} NeuroLab
    </Typography>
  </Box>
);

export default Footer;
