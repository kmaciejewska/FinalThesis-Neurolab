import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { connect } from "react-redux";
import { getPrediction } from "../../redux/actions/eeg";
import Card from "../Card/Card";
import CircularPercantage from "./CircularPercantage";
import { theme } from "../../assets/global/Theme";
import { Item } from "./style";

function GridItem({ title, value, color }) {
  return (
    <Grid
      item
      xs={6}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        height="150px"
        sx={{ backgroundColor: theme.palette.lightViolet.main }}
      >
        <Grid
          container
          direction="row"
          spacing={4}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={8}>
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <CircularPercantage value={value} color={color} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

function Predict(props) {
  let {
    predictionProbability,
    epiChannels,
    getPrediction,
    numberOfAllChannels,
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    getPrediction();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "60px",
        height: "100%",
      }}
    >
      {predictionProbability !== 0 ? (
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem
            title="Channels with ictal activity:"
            value={epiChannels.length}
            allChannelsNum={numberOfAllChannels}
            color="warning"
          />
          <GridItem
            title="Detection probability:"
            value={predictionProbability}
          />
          {epiChannels && epiChannels.length > 0 && (
            <>
              <Box marginTop="70px" width="80%" textAlign="center">
                <Typography variant="h2">Detected channels</Typography>
                <Divider />
              </Box>
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
                {epiChannels.map((channel) => (
                  <Grid item xs={4} key={channel}>
                    <Item>{channel}</Item>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<CategoryIcon />}
          onClick={(e) => handleClick(e)}
        >
          Predict
        </Button>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  predictionProbability: state.eeg.predictionProbability,
  epiChannels: state.eeg.epiChannels,
  numberOfAllChannels: state.eeg.numberOfAllChannels,
});

export default connect(mapStateToProps, { getPrediction })(Predict);
