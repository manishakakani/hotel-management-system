import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getBookingsByDate,
  getCurrentBookings,
  getFutureBookings,
  getPastBookings,
} from "../../axios/BookingAPIs";
import BookingsTable from "../../Components/BookingsTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ListBookings() {
  const [value, setValue] = useState(0);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    getBookingsByDate(date.toISOString()).then((res) => {
      setCurrentBookings(res.data);
    });
    getPastBookings().then((res) => setPastBookings(res.data));
    getFutureBookings().then((res) => setFutureBookings(res.data));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} my={2}>
        <Tabs
          centered
          value={value}
          variant="scrollable"
          scrollButtons
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Current Bookings" {...a11yProps(0)} />
          <Tab label="Future Bookings" {...a11yProps(1)} />
          <Tab label="Past Bookings" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <BookingsTable bookings={currentBookings} refresh={handleRefresh} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookingsTable bookings={futureBookings} refresh={handleRefresh} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BookingsTable bookings={pastBookings} refresh={handleRefresh} />
      </TabPanel>
    </Box>
  );
}

export default ListBookings;
