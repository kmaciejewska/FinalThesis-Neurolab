import React from "react";
import PropTypes from "prop-types";
import {
  Card as C,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const Card = ({ title = null, children, height = null, sx }) => (
  <C
    sx={{
      width: "100%",
      p: 0,
      ...sx,
    }}
  >
    {title && (
      <>
        <CardHeader
          style={{ textAlign: "center" }}
          title={<Typography variant="h5">{title}</Typography>}
        />
        <Divider />
      </>
    )}
    {height ? (
      <CardContent
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: height,
        }}
      >
        {children}
      </CardContent>
    ) : (
      <CardContent
        sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
      >
        {children}
      </CardContent>
    )}
  </C>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
