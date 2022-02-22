import React from "react";
import mpld3 from "mpld3";
import { Box } from "@mui/system";

export default function Plot({ figJson }) {
  function mpld3_load_lib(url, callback) {
    var s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onreadystatechange = s.onload = callback;
    s.onerror = function () {
      console.warn("failed to load library " + url);
    };
    document.getElementsByTagName("head")[0].appendChild(s);
  }

  function plot(json) {
    mpld3_load_lib("https://mpld3.github.io/js/d3.v3.min.js", function () {
      mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.3.js", function () {
        mpld3.draw_figure("fig", json);
      });
    });
  }
  return (
    <>
      <Box id="fig" />
      <div dangerouslySetInnerHTML={{ __html: plot(figJson) }} />
    </>
  );
}
