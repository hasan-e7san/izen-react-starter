import { withAccessControl } from "../../rbac";
import { DropdownMenuItem } from "./dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "./button";

const ProtectedDropdownMenuItem = withAccessControl(DropdownMenuItem);
const ProtectedLink = withAccessControl(Link);
const ProtectedButton = withAccessControl(Button);

export {
  ProtectedDropdownMenuItem,
  ProtectedButton,
  ProtectedLink
};
