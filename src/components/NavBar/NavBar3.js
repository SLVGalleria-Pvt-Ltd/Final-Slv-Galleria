import React, { Fragment, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { setDrawerWidth } from "../../redux/slice/drawerWidthSlice";
import {
  MdCategory,
  MdDashboard,
  MdInventory,
  MdReorder,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowUpRight, BsFillPersonFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { removeAdmin } from "../../redux/slice/adminSlice";
import { Menu, Transition } from "@headlessui/react";
import forgetPassword from "../../services/authentication/forgetPassword";
import toast from "react-hot-toast";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [forgetOpen, setForgetOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forget, setForget] = useState({
    email: "",
    sports: "",
    newPassword: "",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleForgetOpen = () => {
    setForgetOpen(true);
  };

  const handleForgetClose = () =>{
    setForgetOpen(false)
  }

  const handleChangeForget = (e) => {
    setForget((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForget = async (e) => {
    e.preventDefault();
    try {
      const data = await forgetPassword({
        email: forget.email,
        sports: forget.sports,
        newPassword: forget.newPassword,
      });
      console.log("Data", data);
      toast.success(data?.message);
      handleForgetClose();
    } catch (error) {
      toast.error("Invalid email and password!");
      console.log(error);
      handleForgetClose();
    }
  };

  useEffect(() => {
    if (drawerWidth && open) {
      dispatch(setDrawerWidth("240px"));
    } else {
      dispatch(setDrawerWidth("60px"));
    }
  }, [drawerWidth, open]);

  const adminDrawer = [
    {
      title: "Dashboard",
      icon: <MdDashboard className="text-2xl" />,
      navigation: "/admin/dashboard",
    },
    {
      title: "Product",
      icon: <MdInventory className="text-2xl" />,
      navigation: "/admin/dashboard/product",
    },
    {
      title: "Category",
      icon: <MdCategory className="text-2xl" />,
      navigation: "/admin/dashboard/category",
    },
    {
      title: "User",
      icon: <BsFillPersonFill className="text-2xl" />,
      navigation: "/admin/dashboard/user",
    },
    {
      title: "Order",
      icon: <MdReorder className="text-2xl" />,
      navigation: "/admin/dashboard/order",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex w-full justify-between items-center">
              <Box display="flex">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  marginTop="2px"
                  marginRight="1rem"
                >
                  SLV Galleria Admin Panel
                </Typography>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:underline hover:underline-offset-8 font-mono"
                >
                  <Typography>Live Site</Typography>
                  <BsBoxArrowUpRight />
                </a>
              </Box>
              <Menu as="div" className="relative inline-block mt-2">
                <div>
                  <Menu.Button>
                    <FaUserCircle className="text-2xl" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-40 origin-top-right rounded-md bg-blue-900 text-white shadow-lg focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "text-pink-500 font-bold" : "",
                              "block px-4 py-2 text-sm w-full text-start"
                            )}
                            onClick={() => handleForgetOpen()}
                          >
                            Forget Password
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "text-pink-500 font-bold" : "",
                              "block px-4 py-2 text-sm w-full text-start"
                            )}
                            onClick={() => {
                              dispatch(removeAdmin());
                              localStorage.setItem("auth", "");
                              navigate("/admin");
                            }}
                          >
                            Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {adminDrawer.map(({ title, icon, navigation }, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(navigation)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/admin/dashboard/setting")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AiFillSetting className="text-2xl" />
                </ListItemIcon>
                <ListItemText
                  primary="Setting"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
      </Box>
      <Dialog open={forgetOpen} onClose={handleForgetClose}>
        <form
          onSubmit={(e) => {
            handleSubmitForget(e);
          }}
        >
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="email"
              name="email"
              value={forget.email}
              onChange={handleChangeForget}
              label="Email"
              placeholder="Enter your Email"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="sports"
              name="sports"
              value={forget.sports}
              onChange={handleChangeForget}
              label="Answer"
              placeholder="Enter your Favorite Sports"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="newPassword"
              name="newPassword"
              value={forget.newPassword}
              onChange={handleChangeForget}
              label="New Password"
              placeholder="Enter New Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleForgetClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
