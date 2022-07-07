import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { DRAWER_WIDTH } from "../../assets/constants";
import { createUseStyles } from "react-jss";

const drawerWidth = DRAWER_WIDTH;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  height: "64px",
}));

export const useStyles = createUseStyles({
  navBtns: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
  },
});
