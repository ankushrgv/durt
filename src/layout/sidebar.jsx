import React from "react";
// import { Link } from "react-router-dom";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { TimelineRounded, TrendingUpRounded } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/Sidebar.scss";
// import ArrowTooltip from "../components/common/arrowTooltip";

export default function Sidebar(props) {
  const { open } = props;
  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "sidebar-open" : "sidebar-close"}`}
      open={open}
    >
      <List>
            <ListItem button className="font-awesome-icon">
              <ListItemIcon>
                <FontAwesomeIcon icon="home" size="2x" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button className="font-awesome-icon">
              <ListItemIcon>
                <FontAwesomeIcon icon="users" size="2x" />
              </ListItemIcon>
              <ListItemText primary="All Teams" />
            </ListItem>
        <Divider />
          <ListItem button className="font-awesome-icon">
            <ListItemIcon>
              <FontAwesomeIcon icon="chart-area" size="2x" />
            </ListItemIcon>
            <ListItemText primary="Dashboards" />
          </ListItem>
          <ListItem button className="material-ui-icon">
            <ListItemIcon>
              <TrendingUpRounded fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Trend Templates" />
          </ListItem>
          <ListItem button className="material-ui-icon">
            <ListItemIcon>
              <TimelineRounded fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Anomaly Templates" />
          </ListItem>
        <Divider />
          <ListItem button className="font-awesome-icon">
            <ListItemIcon>
              <FontAwesomeIcon icon="file-signature" size="2x" />
            </ListItemIcon>
            <ListItemText primary="Editor" />
          </ListItem>
      </List>
    </Drawer>
  );
}