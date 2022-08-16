import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

const navStyles = {
  color: "inherit",
  typography: "h6",
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ marginBottom: 20 }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <List sx={{ display: "flex" }}>
              <ListItem component={NavLink} to="/" sx={navStyles}>
                Home
              </ListItem>
            </List>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
