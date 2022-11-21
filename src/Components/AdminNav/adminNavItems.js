import {
  BookOnline,
  BusinessRounded,
  HotelRounded,
  PasswordRounded,
  PeopleRounded,
  Person,
} from "@mui/icons-material";
const adminNavItems = [
  // {
  //   icon: <BusinessRounded color="primary" />,
  //   name: "Hotel",
  //   route: "/admin/hotel",
  // },
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
    icon: <BookOnline />,
    name: "Bookings",
    route: "/admin/bookings",
  },
  {
    icon: <Person />,
    name: "Profile",
    route: "/admin/profile",
  },
  // {
  //   icon: <PasswordRounded color="primary" />,
  //   name: "Change Password",
  //   route: "/admin/changePassword",
  // },
];

export default adminNavItems;
