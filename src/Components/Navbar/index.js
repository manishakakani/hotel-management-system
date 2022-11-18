import { LocationOn, Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import adminNavItems from "../AdminNav/adminNavItems";
import resortImage from "../../assets/images/resort.jpg";

function Navbar() {
  const winWidth = useContext(WindowsWidthContext);
  const navigate = useNavigate();
  const handleToHome = () => navigate("/");
  const handleLogin = () => navigate("/login");
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer((prevVal) => !prevVal);
  const handleLogout = () => navigate("/");

  return (
    <Box>
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box
            width="100%"
            height="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img height="250px" width="250px" src={resortImage} />
          </Box>
          <Typography mt={2} variant="h6" color="primary" textAlign="center">
            Admin
          </Typography>
          <List sx={{ marginTop: 2 }}>
            {adminNavItems.map(({ icon, name, route }, index) => (
              <NavLink
                to={route}
                style={({ isActive }) => ({
                  color: isActive ? "#e86537" : "#000",
                  textDecoration: "none",
                })}
              >
                <ListItem
                  key={name}
                  color="text.primary"
                  sx={{ "&:hover": { color: "#e86537" } }}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon> {icon} </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
      <nav
        style={{
          width: "100%",
          backgroundColor: "#F5F5F5",
          height: "2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ marginLeft: winWidth < 500 ? 2 : 8 }}
        >
          <LocationOn sx={{ color: "#000" }} />
          <Typography variant="body1" color="black">
            Missouri
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" paddingRight={4}>
          <Typography variant="body1" color="black">
            PH: +1 314-376-5389
          </Typography>
        </Box>
      </nav>
      <nav
        style={{
          width: "100%",
          backgroundColor: "#e86537",
          height: "5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ marginLeft: winWidth < 500 ? 2 : 8 }}
        >
          <IconButton onClick={toggleDrawer}>
            <Menu sx={{ color: "#fff" }} />
          </IconButton>
          <Typography
            variant="h5"
            color={"#fff"}
            onClick={handleToHome}
            marginLeft={winWidth < 500 ? 2 : 8}
            sx={{ cursor: "pointer", paddingX: "0.2rem" }}
          >
            {winWidth < 500 ? "HMS" : "Hotel Management System"}
          </Typography>
        </Box>
        <Typography
          component={Button}
          variant="button"
          sx={{ color: "#fff" }}
          onClick={handleLogin}
          paddingRight={4}
        >
          Login
        </Typography>
      </nav>
    </Box>
  );
}

export default Navbar;
