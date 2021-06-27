import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Slot from "./Slot";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const PageTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const consecutiveDays = [];
  consecutiveDays.push({
    currentDate: moment().format("YYYY-MM-DD"),
    currentDayName: moment().format("dddd").toLocaleUpperCase(),
  });
  consecutiveDays.push({
    currentDate: moment().add(1, "day").format("YYYY-MM-DD"),
    currentDayName: moment().add(1, "day").format("dddd").toLocaleUpperCase(),
  });
  consecutiveDays.push({
    currentDate: moment().add(2, "day").format("YYYY-MM-DD"),
    currentDayName: moment().add(2, "day").format("dddd").toLocaleUpperCase(),
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {consecutiveDays.map((individualDate, index) => {
            return (
              <Tab label={individualDate.currentDate} {...a11yProps(index)} />
            );
          })}
        </Tabs>
      </AppBar>

      {consecutiveDays.map((individualDate, index) => {
        return (
          <TabPanel value={value} index={index}>
            <Slot checkinDate={individualDate.currentDate} />
          </TabPanel>
        );
      })}
    </div>
  );
};

export default PageTab;
