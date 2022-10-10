import { Snackbar, Alert } from "@mui/material";

export default function ({
  open,
  msg,
  close,
  vertical = "bottom",
  horizontal = "center",
}) {
  const handleSuccessBarClose = () => close();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      onClose={handleSuccessBarClose}
    >
      <Alert
        variant="filled"
        onClose={handleSuccessBarClose}
        severity="success"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
