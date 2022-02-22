import React from "react";
import { Grid, MenuItem, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { theme } from "../../assets/global/Theme";
import Label from "../Label/Label";
import Select from "../Select/Select";
import { connect } from "react-redux";
import { preprocess } from "../../redux/actions/eeg";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import Card from "../Card/Card";

function Filter(props) {
  let { filterSettings, defaultSettings, preprocess, filteredPlot } = props;

  const [filterState, setFilterState] = React.useState({
    low: defaultSettings.l_freq,
    high: defaultSettings.h_freq,
    default: true,
  });

  const lows = filterSettings.low_freqs;
  const highs = filterSettings.high_freqs;

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.type === "checkbox" && value) {
      //default settings
      setFilterState({
        low: defaultSettings.l_freq,
        high: defaultSettings.h_freq,
        default: true,
      });
    } else {
      setFilterState({
        ...filterState,
        [e.target.name]: value,
      });
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      sx={{ display: "flex", alignItems: "center" }}
      minHeight="100%"
    >
      <Grid
        container
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Grid item>
          <Typography variant="h3">Filter Settings</Typography>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                name="default"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                checked={filterState.default}
                onChange={(e) => handleChange(e)}
              />
            }
            label={<Typography variant="h4">Accept Default</Typography>}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
          padding: "20px",
          borderRadius: "5px",
          width: "100%",
          backgroundColor: theme.palette.almond.main,
        }}
      >
        <Grid container direction="row" width="100%" height="100%" spacing={2}>
          <Grid item xs={6}>
            <Label htmlFor="low">Low frequency</Label>
            <Select
              id="low"
              name="low"
              value={filterState.low}
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="outlined"
              size="small"
              disabled={filterState.default}
            >
              {lows.map((option) => (
                <MenuItem key={option} value={option}>
                  <Typography variant="h4">{option + " Hz"}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="high">High frequency</Label>
            <Select
              id="high"
              name="high"
              value={filterState.high}
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="outlined"
              size="small"
              disabled={filterState.default}
            >
              {highs.map((option) => (
                <MenuItem key={option} value={option}>
                  <Typography variant="h4">{option + " Hz"}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "50px",
          height: "100%",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          size="large"
          endIcon={<FilterCenterFocusIcon />}
          onClick={() => preprocess(filterState)}
        >
          Preprocess
        </Button>
      </Box>
      <Grid
        container
        direction="row"
        width="100%"
        height="100%"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "20px",
        }}
      >
        <Grid item xs={6}>
          <Card title="Raw data plot">
            <img
              className="img-raw"
              src={require("../../assets/images/raw.png")}
              alt="Raw data plot"
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          {filteredPlot !== {} && filteredPlot.filtered && (
            <Card title="Filtered data plot">
              <img
                className="img-raw"
                src={require("../../assets/images/filtered.png")}
                alt="Filtered data plot"
              />
            </Card>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  filterSettings: state.eeg.filterSettings,
  defaultSettings: state.eeg.defaultSettings,
  filteredPlot: state.eeg.filteredPlot,
});

export default connect(mapStateToProps, { preprocess })(Filter);
