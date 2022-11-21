import {
  AddBox,
  ChevronLeft,
  ChevronRight,
  Close,
  Done,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomTypesByRoomTypeID } from "../../axios/RoomTypeAPIs";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import CheckAvailability from "../CheckAvailability";

function RoomDetails() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [indexSelected, setIndexSelected] = useState(-1);
  const imageList = [
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
  ];
  const lengthOfImageList = imageList.length;
  const [imageToShow, setImageToShow] = useState("");
  const [bookRoom, setBookRoom] = useState(false);

  useEffect(() => {
    getRoomTypesByRoomTypeID(type).then((res) => {
      setRoomDetails(res.data[0]);
    });
  }, []);

  const changeImage = () => {
    if (indexSelected === lengthOfImageList - 1) {
      setImageToShow(imageList[0]);
      setIndexSelected(0);
    } else {
      setImageToShow(imageList[indexSelected + 1]);
      setIndexSelected(indexSelected + 1);
    }
  };

  const handleLeftClick = () => {
    if (indexSelected === 0) {
      setImageToShow(imageList[lengthOfImageList - 1]);
      setIndexSelected(lengthOfImageList - 1);
    } else {
      setImageToShow(imageList[indexSelected - 1]);
      setIndexSelected(indexSelected - 1);
    }
  };

  const handleRightClick = () => changeImage();

  const handleBookRoom = () => {
    const roomDetails = {
      roomType: roomDetails.RoomType,
      costPerDay: roomDetails.Rate,
      additionalCharges: "0",
      subCost: "9.99",
      TotalCost: "9.99",
    };
    setRoomToBookContext(roomDetails);
  };

  useEffect(() => {
    if (roomBookContext && Object.keys(roomBookContext).length)
      navigate("./confirm", { relative: "path" });
  }, [roomBookContext]);

  useEffect(() => {
    if (imageList.length > 0) {
      if (indexSelected == -1) {
        setIndexSelected(0);
        setImageToShow(imageList[0]);
      } else {
        setTimeout(() => {
          changeImage();
        }, 3000);
      }
    }
  }, [indexSelected]);

  const handleCheckAvailability = () => setBookRoom(true);

  useEffect(() => {
    if (bookRoom) {
      document
        .getElementById("availability")
        .scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [bookRoom]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        marginY={4}
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton onClick={handleLeftClick}>
          <ChevronLeft />
        </IconButton>
        <img
          style={{ "max-width": "75%", "max-height": "400px" }}
          src={imageToShow}
          alt={imageToShow}
        />
        <IconButton onClick={handleRightClick}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Box
        width="50%"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="h6" color="primary" paddingRight={2}>
            {" "}
            Room Type :{" "}
          </Typography>
          <Typography variant="h6"> {roomDetails.RoomType} </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant="h6" color="primary" paddingRight={2}>
          Cost/night :
        </Typography>
        <Typography variant="h6">${roomDetails.Rate}</Typography>
      </Box>
      <Typography variant="caption">
        (Check-in: 12 PM, Check-out: 11 AM)
      </Typography>
      {/* <Box
        display="flex"
        width="50%"
        justifyContent="space-around"
        marginY={4}
        flexWrap="wrap"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            paddingX={4}
          >
            <Typography variant="title" color="green" display="flex">
              <Done />
            </Typography>
            <Typography variant="title" paddingRight={2}>
              Smoking
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            paddingX={4}
          >
            <Typography variant="title" color="red" display="flex">
              <Close />
            </Typography>
            <Typography variant="title" paddingRight={2}>
              Pets Allowed
            </Typography>
          </Box>
        </Box>
      </Box> */}
      {/* <Button color="primary" variant="contained" onClick={handleBookRoom}>
        Proceed To Book
      </Button> */}
      {/* {bookRoom ? null : (
        <Button
          variant="contained"
          color="primary"
          marginY={6}
          onClick={handleCheckAvailability}
        >
          Check availability for booking{" "}
        </Button>
      )} */}
      <section id="availability">
        <CheckAvailability
          roomDetails={{
            roomType: roomDetails.RoomType,
            RoomTypeID: roomDetails.RoomTypeID,
            costPerDay: roomDetails.Rate,
          }}
        />
      </section>
    </Box>
  );
}

export default RoomDetails;
