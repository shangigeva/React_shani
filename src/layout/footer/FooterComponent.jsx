import { Fragment, useState } from "react";
import { Divider } from "@mui/material";
import Links from "./ui/Links";

const FooterComponent = () => {
  return (
    <Fragment>
      <Divider></Divider>
      <Links />
    </Fragment>
  );
};

export default FooterComponent;
