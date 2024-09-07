import React, { useEffect } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    Container,
    Tooltip,
    Button,
} from "@mui/material";

// Images
import Logo from "../../Images/Logo/White.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "src/Context/AuthContext";
import { useLogout } from "src/Hooks/useAuth";
import useMenu from "src/Hooks/useMenu";
import useNotification from "src/Hooks/useNotif";
import { read } from "fs";

export default function Header() {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const { logout } = useLogout();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const {
        menuVariables,
        setMenuVariables,
        MenuComp,
        MenuItemComp,
        handleClose,
    } = useMenu();
    const [mode, setMode] = React.useState(
        localStorage.getItem("mode") || "Renter"
    );

    const { notifications, getNotification, readNotification } =
        useNotification();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const changeUserMode = () => {
        if (mode === "Renter") {
            if (authUser?.description || localStorage.getItem("New Host")) {
                setMode("Host");
                localStorage.setItem("mode", "Host");
            } else {
                navigate("/host");
            }
        } else {
            setMode("Renter");
            localStorage.setItem("mode", "Renter");
        }
        window.location.reload();
    };

    useEffect(() => {
        getNotification();
    }, []);

    return (
        <AppBar position="static" sx={{ background: "#144273" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ gap: "1em" }}>
                    <Box
                        display="flex"
                        sx={{ flexGrow: 1 }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img
                            src={Logo}
                            width={"100px"}
                            alt=""
                            className="cursor-pointer"
                            draggable={false}
                        />
                    </Box>
                    {authUser ? (
                        <>
                            <div className="flex items-center">
                                <div className="border-r-2 border-[white]/60 mr-2 pr-4 hidden sm:block ">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: "white",
                                            opacity: ".9",
                                            borderRadius: "15px",
                                            padding: ".4em 1.5em",
                                            color: "white",
                                            ":hover": { borderColor: "white" },
                                        }}
                                        onClick={changeUserMode}
                                    >
                                        {mode} Mode
                                    </Button>
                                </div>
                                <Tooltip title="Notification">
                                    <IconButton
                                        aria-label=""
                                        onClick={(e) => {
                                            setMenuVariables({
                                                ...menuVariables,
                                                anchorEl: e.currentTarget,
                                                content: (
                                                    <NotificationMenu
                                                        notifications={
                                                            notifications
                                                        }
                                                    />
                                                ),
                                            });
                                        }}
                                    >
                                        <NotificationsIcon
                                            sx={{ color: "white" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={(
                                            event: React.MouseEvent<HTMLElement>
                                        ) => {
                                            setAnchorElUser(
                                                event.currentTarget
                                            );
                                        }}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="UserProfile"
                                            src={
                                                authUser
                                                    ? authUser?.photo
                                                    : "/static/images/avatar/2.jpg"
                                            }
                                            sx={{
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div className="sm:hidden">
                                        <MenuItem
                                            onClick={() => {
                                                // navigate("/profile")
                                                // handleCloseUserMenu()
                                            }}
                                        >
                                            <Typography textAlign="center">
                                                Switch to Renter Mode
                                            </Typography>
                                        </MenuItem>
                                    </div>
                                    <MenuItem
                                        onClick={() => {
                                            navigate("/profile");
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate("/listing");
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            My Listings
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="text"
                                sx={{ color: "white" }}
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                login
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    background: "white",
                                    color: "#144273",
                                    padding: ".5em 2em",
                                    ":hover": { color: "white" },
                                }}
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
            <MenuComp />
        </AppBar>
    );
}

const NotificationMenu = ({ notifications }) => {
    const { readNotification } = useNotification();
    return (
        <>
            <div className="px-4 w-[100vw] max-w-[300px]">
                <p className="pb-1 border-b border-[black]/10 font-semibold">
                    Notifications
                </p>
                <div className="flex flex-col max-h-[300px] gap-1 pt-2">
                    {notifications.map((notification) => (
                        <div
                            className="p-4 bg-[black]/5 hover:bg-[black]/15 rounded-xl flex cursor-pointer"
                            style={{ transition: "all .3s ease-in-out" }}
                            onClick={() => {
                                readNotification({
                                    notificationId: notification._id,
                                });
                            }}
                        >
                            <Avatar
                                variant="circular"
                                src=""
                                alt=""
                                sx={{ width: "40px", height: "40px" }}
                            />
                            <div className="pt-[5px]">
                                <p className=" text-[14px] leading-[14px] font-semibold">
                                    {notification.type}
                                </p>
                                <p className="text-[10px] text-justify">
                                    {notification.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
