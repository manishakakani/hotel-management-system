import {
  BookOnline,
  CleaningServices,
  PasswordRounded,
  Person2,
} from "@mui/icons-material";
const staffNavItems = [
  {
    icon: <BookOnline color="primary" />,
    name: "Bookings",
    route: "/staff/bookings",
  },

  {
    icon: <CleaningServices color="primary" />,
    name: "Service Requested",
    route: "/staff/serviceRequested",
  },
  {
    icon: <Person2 color="primary" />,
    name: "Profile",
    route: "/staff/profile",
  },
  {
    icon: <PasswordRounded color="primary" />,
    name: "Change Password",
    route: "/staff/changepassword",
  },
];

export default staffNavItems;
