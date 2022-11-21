import { History, Person2, Room } from "@mui/icons-material";

const customerNavItems = [
  {
    icon: <Room />,
    name: "Rooms",
    route: "/rooms",
  },
  {
    icon: <History />,
    name: "History",
    route: "/history",
  },
  {
    icon: <Person2 />,
    name: "Profile",
    route: "/profile",
  },
];

export default customerNavItems;
