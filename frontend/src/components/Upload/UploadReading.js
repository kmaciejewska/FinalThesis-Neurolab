import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Tooltip } from "../Tooltip/Tooltip";
import { theme } from "../../assets/global/Theme";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import { DropzoneArea } from "material-ui-dropzone";
import { enabledTheme } from "./style";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { getFormats, uploadFile, resetState } from "../../redux/actions/eeg";

function UploadReading(props) {
  let { getFormats, formats, uploadFile, resetState } = props;

  React.useEffect(() => {
    getFormats();
  }, [getFormats]);

  const [file, setFile] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      uploadFile(file);
      setFile(null);
      setIsSubmitting(false);
    }
  }, [file, isSubmitting, uploadFile]);

  React.useEffect(() => {
    console.log(file);
    // dispatch state reset here
    resetState();
  }, [file, resetState]);

  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        maxWidth: "100%",
        color: theme.palette.text.primary,
        fontSize: 16,
        border: "solid 1px",
        borderRadius: "5px",
        margin: "0",
      },
      fileDeleted: {
        display: "none",
      },
    })
  );

  const classes = useStyles();

  return (
    <Card
      sx={{
        minWidth: 350,
        width: 400,
        height: "60vh",
        background: theme.palette.linen.main,
        postion: "relative",
        borderRadius: 3,
      }}
    >
      <CardHeader
        height="20%"
        action={
          <Tooltip
            title={
              <Typography variant="h6" fontWeight="fontWeightLight">
                Allowed file formats are:{" "}
                {formats.map((format, index, formats) => {
                  let str = "." + format;
                  if (index + 1 !== formats.length) str += ", ";
                  return str;
                })}
              </Typography>
            }
            placement="top-end"
            leaveDelay={500}
          >
            <IconButton aria-label="delete" size="small">
              <HelpCenterRoundedIcon color="info" fontSize="inherit" />
            </IconButton>
          </Tooltip>
        }
        title={
          <Typography variant="h3" color={theme.palette.text.primary}>
            Upload your File
          </Typography>
        }
      />
      <CardContent
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <MuiThemeProvider theme={enabledTheme}>
            <DropzoneArea
              Icon={AddRoundedIcon}
              filesLimit={1}
              showPreviews={true}
              showPreviewsInDropzone={false}
              useChipsForPreview
              maxFileSize={50000000}
              showAlerts={false}
              previewText=""
              previewChipProps={{
                classes:
                  !file || file.length === 0
                    ? { root: classes.fileDeleted }
                    : { root: classes.previewChip },
              }}
              onChange={(file) => setFile(file)}
            />
          </MuiThemeProvider>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Divider />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                marginTop: "20px",
                border: "2px solid #9A98B5",
                borderRadius: "10px",
                ":hover": {
                  border: "2px solid #9A98B5",
                  borderRadius: "10px",
                },
              }}
              disabled={!file || file.length === 0}
              onClick={() => setIsSubmitting(true)}
            >
              <Typography variant="h5">SUBMIT</Typography>
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  formats: state.eeg.formats,
});

export default connect(mapStateToProps, { getFormats, uploadFile, resetState })(
  UploadReading
);
