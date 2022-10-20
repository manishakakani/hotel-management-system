import {
  BusinessRounded,
  HotelRounded,
  PasswordRounded,
  PeopleRounded,
} from "@mui/icons-material";
const adminNavItems = [
  {
    icon: <BusinessRounded color="primary" />,
    name: "Hotel",
    route: "/admin/hotel",
  },
  {
    icon: <HotelRounded color="primary" />,
    name: "Rooms",
    route: "/admin/rooms",
  },
  {
    icon: <PeopleRounded color="primary" />,
    name: "Staff",
    route: "/admin/staff",
  },
  {
    icon: <PasswordRounded color="primary" />,
    name: "Change Password",
    route: "/admin/changePassword",
  },
];

export default adminNavItems;
