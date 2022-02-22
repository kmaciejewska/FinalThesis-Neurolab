import React from "react";
import { connect } from "react-redux";
import Card from "../Card/Card";
import Table from "../Table/Table";
import { Grid, Paper } from "@mui/material";
import "./style.css";
import Plot from "../Plot";

function FileInfo(props) {
  let { file, fileInfo, plot } = props;
  console.log(file);
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Grid item>
        <Card title={file.name}>
          <Table head={Object.keys(fileInfo)} fileInfo={fileInfo} />
        </Card>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="15px"
        marginBottom="35px"
      >
        <Grid item>
          <Paper variant="outlined">
            <img
              className="img-raw"
              src={require("../../assets/images/raw.png")}
              alt="Raw data plot"
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper variant="outlined">
            <Plot figJson={plot} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  file: state.eeg.file,
  fileInfo: state.eeg.fileInfo,
  plot: state.eeg.plot,
});

export default connect(mapStateToProps)(FileInfo);
