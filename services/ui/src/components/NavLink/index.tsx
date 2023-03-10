import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Chip from "../Chip";

const liClassName = (selected: boolean) =>
    `p-3 flex flex-row items-center ${
        selected ? "bg-purple-100 text-purple-700 font-medium" : "text-black font-normal"
    }`;

const iconClassName = (selected: boolean) =>
    `pl-2 pr-4 ${selected ? "text-purple-700" : "text-gray-500"}`;

const NavLinkWithoutRouting: React.FunctionComponent<
    React.PropsWithChildren<{
        icon?: React.ReactElement;
        chip?: React.ReactElement;
    }>
> = (props) => {
    const { children, icon, chip } = props;
    return (
        <li className={liClassName(false)}>
            {icon != null && <span className={iconClassName(false)}>{icon}</span>}
            {children}
            {chip != null && <Chip selected={false}>{chip}</Chip>}
        </li>
    );
};

const NavLinkWithRouting: React.FunctionComponent<
    React.PropsWithChildren<{
        pathname: string;
        icon?: React.ReactElement;
        chip?: React.ReactElement;
    }>
> = (props) => {
    const { children, pathname, icon, chip } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const selected = location.pathname === pathname;
    if (selected) {
        return (
            <span
                className={liClassName(selected)}
                onClick={selected ? undefined : () => navigate(pathname)}
            >
                {icon != null && <span className={iconClassName(selected)}>{icon}</span>}
                {children}
                {chip != null && <Chip selected={selected}>{chip}</Chip>}
            </span>
        );
    }
    return (
        <Link
            to={pathname}
            className={liClassName(selected)}
            onClick={selected ? undefined : () => navigate(pathname)}
        >
            {icon != null && <span className={iconClassName(selected)}>{icon}</span>}
            {children}
            {chip != null && <Chip selected={selected}>{chip}</Chip>}
        </Link>
    );
};

const NavLink: React.FunctionComponent<
    React.PropsWithChildren<{
        icon?: React.ReactElement;
        chip?: React.ReactElement;
        to: string;
        includeRouting: boolean;
    }>
> = (props) => {
    const { children, to, includeRouting, icon, chip } = props;
    if (includeRouting) {
        return <NavLinkWithRouting chip={chip} icon={icon} children={children} pathname={to} />;
    } else {
        return <NavLinkWithoutRouting chip={chip} icon={icon} children={children} />;
    }
};

export default NavLink;
