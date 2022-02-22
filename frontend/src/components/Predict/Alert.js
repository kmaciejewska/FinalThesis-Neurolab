import { AlertTitle, Alert as A } from "@mui/material";
import React from "react";

export default function Alert({ severity, title, subtitle, strongSubtitle }) {
  return (
    <A severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {subtitle} — <strong>{strongSubtitle}</strong>
    </A>
  );
}
