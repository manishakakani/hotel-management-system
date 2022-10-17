import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RoomCard() {
  const navigate = useNavigate();
  const [indexSelected, setIndexSelected] = useState(-1);
  const imageList = [
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
  ];
  const lengthOfImageList = imageList.length;
  const [imageToShow, setImageToShow] = useState("");

  const handleCardClick = () => navigate("/room/201");

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
      <CardHeader title="Room No. 201" subheader="Deluxe Room" />
      <CardMedia component="img" height="194" image={imageToShow} alt="room" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Cost Per Day: $9.99
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
