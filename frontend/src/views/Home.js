import React, { useRef } from "react";
import { Grid } from "@mui/material";
import Tabs from "../layout/Tabs";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import FileInfo from "../components/FileInfo/FileInfo";
import { connect } from "react-redux";
import Filter from "../components/Filter/Filter";
import Predict from "../components/Predict/Predict";
import { getFilterSettings } from "../redux/actions/eeg";
import Alert from "../components/Alert";

const tabs = [
  {
    label: "File information",
    value: "1",
    component: <FileInfo />,
  },
  {
    label: "Filtering",
    value: "2",
    component: <Filter />,
  },
  {
    label: "Prediction",
    value: "3",
    component: <Predict />,
  },
];

function Home(props) {
  let { file, getFilterSettings } = props;

  const ref = useRef(null);
  React.useEffect(() => {
    getFilterSettings();
    if (file) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [file, getFilterSettings]);
  return (
    <>
      <Alert />
      {file && (
        <Grid container spacing={0}>
          <Box
            width="100%"
            xs={12}
            lg={12}
            sm={12}
            sx={{
              ml: 2,
              mt: 5,
            }}
            ref={ref}
          >
            <StyledEngineProvider injectFirst>
              <Tabs tabs={tabs} />
            </StyledEngineProvider>
          </Box>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  file: state.eeg.file,
});

export default connect(mapStateToProps, { getFilterSettings })(Home);
