import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import BookingUpdationForm from "../BookingUpdationForm";
import { getPersonByUniqueNum } from "../../axios/PersonAPIs";
import { getPaymentDetailsByReservationNum } from "../../axios/PaymentsAPIs";
import { getRoomByRoomID } from "../../axios/RoomAPIs";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "bookingID",
    numeric: false,
    disablePadding: true,
    label: "Booking ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "StartDate",
    numeric: false,
    disablePadding: false,
    label: "Arrival Date",
  },
  {
    id: "Duration",
    numeric: false,
    disablePadding: false,
    label: "Duration (days)",
  },
  {
    id: "NumberOfRooms",
    numeric: false,
    disablePadding: false,
    label: "No of Rooms",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6" color="primary">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected == 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h3"
          mt={2}
          mb={4}
          color="primary"
          id="tableTitle"
          component="div"
          textAlign="center"
        >
          Bookings
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}

      {
        numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      }
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function ExpandableTableRow({ row, index, isSelected, handleClick, openForm }) {
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;
  const [open, setOpen] = React.useState(false);
  const [person, setPerson] = React.useState();
  const [payment, setPayment] = React.useState();
  const [rooms, setRooms] = React.useState([]);
  const handleExpandClick = () => setOpen(!open);

  const handleUpdate = () => openForm({ row, person, payment, rooms });

  const getDate = (date) => {
    const newdate = new Date(date);
    return (
      newdate.getFullYear() + "/" + newdate.getMonth() + "/" + newdate.getDate()
    );
  };

  const getDateTime = (datetime) => {
    const newdate = new Date(datetime);
    return (
      newdate.getFullYear() +
      "/" +
      newdate.getMonth() +
      "/" +
      newdate.getDate() +
      " " +
      newdate.getHours() +
      ":" +
      newdate.getMinutes()
    );
  };

  React.useEffect(() => {
    if (Object.keys(row).length !== 0) {
      getPersonByUniqueNum(row.CustomerUniqueNumber).then((res) => {
        setPerson(res.data[0]);
      });
      getPaymentDetailsByReservationNum(row.BookingID).then((res) => {
        setPayment(res.data[0]);
      });
      row?.RoomIDs.map((id) => {
        getRoomByRoomID(id).then((res) => {
          setRooms((oldValues) => {
            let val = oldValues.filter((oldV) => oldV.id == res.data[0].id);
            if (val.length) {
              return oldValues;
            } else return [...oldValues, res?.data[0]];
          });
        });
      });
    }
  }, [row]);

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{ backgroundColor: open ? "#f5f5f5" : "whhite" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onClick={(event) => handleClick(event, row.id)}
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          <Typography variant="body1">{row.BookingID}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{person?.Name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {row.StartDate ? getDate(row.StartDate) : ""}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.Duration}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.NumberOfRooms}</Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={handleExpandClick}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      {open ? (
        <>
          <TableRow
            sx={{ backgroundColor: open ? "#f5f5f5" : "whhite" }}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={index + "secondRow"}
            selected={isItemSelected}
          >
            <TableCell />
            <TableCell>
              <Typography variant="body1" color="primary">
                Phone Number
              </Typography>
              <Typography variant="body1">{person?.PhoneNumber}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Check-in Time
              </Typography>
              <Typography variant="body1">
                {row.CheckInTime ? getDateTime(row.CheckInTime) : ""}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Check-out Time
              </Typography>
              <Typography variant="body1">
                {row.CheckOutTime ? getDateTime(row.CheckOutTime) : ""}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Rooms Booked
              </Typography>
              <Typography variant="body1">
                {rooms?.map((r) => r.RoomNumber + ", ")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Paid On
              </Typography>
              <Typography variant="body1">
                {payment?.PaymentDate ? getDate(payment.PaymentDate) : ""}
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={index + "thirdRow"}
            selected={isItemSelected}
            sx={{ backgroundColor: open ? "#f5f5f5" : "whhite" }}
          >
            <TableCell />
            <TableCell>
              <Typography variant="body1" color="primary">
                Additional Charges
              </Typography>
              <Typography variant="body1">${row.AdditionalCharges}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Sub Total
              </Typography>
              <Typography variant="body1">${row.SubTotal}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Grand Total
              </Typography>
              <Typography variant="body1">${row.TotalAmount}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Amount Paid
              </Typography>
              <Typography variant="body1">${payment?.AmountPaid}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" color="primary">
                Payment Status
              </Typography>
              <Typography variant="body1"> {payment?.PaymentStatus}</Typography>
            </TableCell>
            <TableCell>
              <Tooltip title="Update">
                <IconButton onClick={handleUpdate}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </>
      ) : null}
    </>
  );
}

export default function BookingsTable({ bookings }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openUpdationForm, setOpenUpdationForm] = React.useState(false);
  const [detailsToUpdate, setDetailsToUpdate] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = bookings.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleOpenUpdationForm = (details) => {
    setDetailsToUpdate(details);
    setOpenUpdationForm(true);
  };
  const handleCloseUpdationForm = () => {
    setOpenUpdationForm(false);
    setDetailsToUpdate(null);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      {openUpdationForm ? (
        <BookingUpdationForm
          bookingDetails={detailsToUpdate}
          close={handleCloseUpdationForm}
        />
      ) : (
        <Paper sx={{ width: "90%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={bookings.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                {stableSort(bookings, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <ExpandableTableRow
                        row={row}
                        index={index}
                        isSelected={isSelected}
                        handleClick={handleClick}
                        openForm={handleOpenUpdationForm}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
