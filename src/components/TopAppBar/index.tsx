import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import classes from "./TopAppBar.module.scss";
import { getProfile } from "../../store/app/selectors";
import { useFetchCountHook, useFetchWhoami, useFetchProfilePicture } from "../../util/customHooks";

const TopAppBar: React.FunctionComponent<{ includeRouting: boolean }> = (props) => {
    const { includeRouting } = props;
    const profile = useSelector(getProfile);
    const fetchCount = useFetchCountHook();
    const fetchWhoami = useFetchWhoami();
    const fetchProfilePicture = useFetchProfilePicture();
    useEffect(() => {
        if (includeRouting) {
            fetchProfilePicture();
            fetchWhoami();
            fetchCount();
        }
    }, [fetchProfilePicture, fetchWhoami, fetchCount, includeRouting]);
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    component={includeRouting ? Link : "a"}
                    to="/home"
                    href="/home"
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Betro
                </Typography>
                <div style={{ flex: 1 }}></div>
                <div>
                    {profile.profile_picture && (
                        <img width="30" height="30" src={profile.profile_picture} alt="Profile" />
                    )}
                </div>
                <Typography>
                    {isEmpty(profile.first_name)
                        ? profile.username
                        : `${profile.first_name} ${profile.last_name}`}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
