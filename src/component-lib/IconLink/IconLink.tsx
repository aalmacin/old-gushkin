import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./IconLink.module.scss";
import { Link } from "react-router-dom";

interface IconLinkProps {
  isExternal?: boolean,
  to: string,
  icon: any,
  onClick?: any
}

const IconLink: React.FC<IconLinkProps> = ({ isExternal, to, onClick, icon, children }) => {

  const iconHtml = (<span className={classes.Icon}>
    <FontAwesomeIcon icon={icon} />
  </span>);

  const defaultEvent = () => { };

  const clickEvent = onClick || defaultEvent;

  return (
    isExternal ? <a className={classes.IconLink} href={to} onClick={clickEvent}>{iconHtml} {children}</a>
      :
      <Link className={classes.IconLink} to={to} onClick={clickEvent}>{iconHtml} {children}</Link>
  );
}

export default IconLink;