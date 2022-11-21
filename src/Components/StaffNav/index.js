import {
  BookOnline,
  CleaningServices,
  PasswordRounded,
  Person2,
} from "@mui/icons-material";
const staffNavItems = [
  {
    icon: <BookOnline />,
    name: "Bookings",
    route: "/staff/bookings",
  },

  {
    icon: <CleaningServices />,
    name: "Service Requested",
    route: "/staff/serviceRequested",
  },
  {
    icon: <Person2 />,
    name: "Profile",
    route: "/staff/profile",
  },
  // {
  //   icon: <PasswordRounded color="primary" />,
  //   name: "Change Password",
  //   route: "/staff/changePassword",
  // },
];

export default staffNavItems;
