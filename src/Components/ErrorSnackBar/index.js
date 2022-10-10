import { Snackbar, Alert, Typography } from "@mui/material";

function ErrorSnackBar({
  open,
  msg,
  caption = "",
  close,
  vertical = "bottom",
  horizontal = "center",
}) {
  const handleErrorBarClose = () => close();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      onClose={handleErrorBarClose}
    >
      <Alert
        variant="filled"
        onClose={handleErrorBarClose}
        severity="error"
        sx={{ width: "100%" }}
      >
        <Typography variant="body2">{msg}</Typography>
        {caption && <Typography variant="caption">{caption}</Typography>}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackBar;
