import React from "react";
import {
  Collapse,
  Grid,
  IconButton,
  Table as T,
  TableCell,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../Table/style";
import { theme } from "../../assets/global/Theme";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";

function CollapsibleRow({ channels }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" colSpan={4}>
          <Typography variant="h5">Detected EEG channels' names</Typography>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
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
                {channels.map((channel, index) => (
                  <Grid item xs={4} key={channel}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      key={channel}
                    >
                      {channel}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Table({ head, fileInfo }) {
  return (
    <TableContainer component={Paper}>
      <T sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.almond.main }}>
            {head.map(
              (head) =>
                head !== "Channel names" && (
                  <StyledTableCell key={head} align="left">
                    <Typography variant="h5">{head}</Typography>
                  </StyledTableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {head.map(
              (head) =>
                head !== "Channel names" && (
                  <StyledTableCell align="center" key={head}>
                    {fileInfo[head]}
                  </StyledTableCell>
                )
            )}
          </StyledTableRow>
          {fileInfo["Channel names"] && (
            <CollapsibleRow channels={fileInfo["Channel names"]} />
          )}
        </TableBody>
      </T>
    </TableContainer>
  );
}
