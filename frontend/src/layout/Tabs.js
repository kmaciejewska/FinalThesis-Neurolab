import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

/* tabs props should be an object that has label, value and a respective component field */
export default function Tabs({ tabs }) {
  const [tab, setTab] = React.useState("1");

  const handleChange = (event) => {
    //event target id outpus something like: mui-p-45400-T-2
    let newTab = event.target.id.toString().slice(-1);
    // if the user clicks outside of the tabs
    if (isNaN(parseInt(newTab))) return;

    setTab(event.target.id.toString().slice(-1));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1 }}>
          <TabList
            onClick={(e) => handleChange(e)}
            textColor="inherit"
            indicatorColor="primary"
            centered
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                label={tab.label}
                value={tab.value}
                sx={{ typography: "h2" }}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab) => (
          <TabPanel key={tab.label} value={tab.value}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
