import React from "react";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import { resetAlert } from "../redux/actions/errors";
import { Typography } from "@mui/material";

const GlobalAlert = (props) => {
  const { msg, resetAlert } = props;

  setTimeout(() => resetAlert(), 3000);

  if (msg === "") {
    return <></>;
  }

  return (
    <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
      <Typography variant="h4">{msg}</Typography>
    </Alert>
  );
};

const mapStateToProps = (state) => ({
  msg: state.errors.msg,
});

export default connect(mapStateToProps, { resetAlert })(GlobalAlert);
