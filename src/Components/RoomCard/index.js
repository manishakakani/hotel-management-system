import { Close, Done } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RoomCard({ room }) {
  const navigate = useNavigate();
  const [indexSelected, setIndexSelected] = useState(-1);
  const imageList = [
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
  ];
  const lengthOfImageList = imageList.length;
  const [imageToShow, setImageToShow] = useState("");

  const handleCardClick = () => navigate("/room/" + room.RoomTypeID);

  useEffect(() => {
    if (imageList.length > 0) {
      if (indexSelected == -1) {
        setIndexSelected(0);
        setImageToShow(imageList[0]);
      } else {
        setTimeout(() => {
          if (indexSelected === lengthOfImageList - 1) {
            setImageToShow(imageList[0]);
            setIndexSelected(0);
          } else {
            setImageToShow(imageList[indexSelected + 1]);
            setIndexSelected(indexSelected + 1);
          }
        }, 3000);
      }
    }
  }, [indexSelected]);

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleCardClick}>
      <CardHeader
        title={room.RoomType}
        subheader={"$" + room.Rate + "/night"}
      />
      <CardMedia component="img" height="194" image={imageToShow} alt="room" />
      <CardContent>
        <Box display="flex" flexDirection="column">
          {/* <Box
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
          </Box> */}
          {/* <Box
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
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
