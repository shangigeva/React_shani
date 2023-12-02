import { Fragment, useState } from "react";
import { BottomNavigation, Divider } from "@mui/material";
import Links from "./ui/Links";

const FooterComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <Fragment>
      <Divider></Divider>
      <Links />
    </Fragment>
  );
};

export default FooterComponent;
