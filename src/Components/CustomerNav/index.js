import {
  History,
  PasswordRounded,
  Person2,
  Room,
  RoomService,
} from "@mui/icons-material";

const customerNavItems = [
  {
    icon: <Room color="primary" />,
    name: "Rooms",
    route: "/rooms",
  },
  {
    icon: <RoomService color="primary" />,
    name: "Request Service",
    route: "/requestService",
  },
  {
    icon: <History color="primary" />,
    name: "History",
    route: "/history",
  },
  {
    icon: <Person2 color="primary" />,
    name: "Profile",
    route: "/profile",
  },
  {
    icon: <PasswordRounded color="primary" />,
    name: "Change Password",
    route: "/changepassword",
  },
];

export default customerNavItems;
