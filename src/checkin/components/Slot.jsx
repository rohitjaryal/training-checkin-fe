import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { fetchMemberEnum, fetchSlots, updateSlotData } from "../api/apiUtil";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    minWidth: 1050,
    background: "white",
  },
});

const Slot = (props) => {
  const { checkinDate } = props;
  const classes = useStyles();
  const [memberListState, setMemberListState] = useState({});
  const [slotListState, setSlotListState] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  async function fetchSlotInfo() {
    const response = await fetchSlots();

    const data =
      response &&
      response?.data &&
      response?.data?.find((checkinDates) => {
        return checkinDates?.slotDate === checkinDate;
      });
    return data;
  }

  async function updateData(data) {
    const response = await updateSlotData(data);
    if (response?.data) {
      const data = await fetchSlotInfo();

      setSlotListState({
        data,
      });
      setSuccessAlertOpen(true);
    } else {
      setErrorAlertOpen(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetchMemberEnum();
      setMemberListState({
        data: response?.data,
      });
    }
    async function fetchSlotInfo() {
      const response = await fetchSlots();
      const data =
        response &&
        response?.data &&
        response?.data?.find((checkinDates) => {
          return checkinDates?.slotDate === checkinDate;
        });
      console.log("test:>", data);

      // return data;
      setSlotListState({
        data,
      });
    }
    fetchData();

    const data = fetchSlotInfo();
    setSlotListState({
      data,
    });
  }, []);

  const handleMemberClick = (index, member, slot, event) => {
    const redArr = slotListState?.data.slots[index].members.reduce(
      (acc, current) => {
        if (current.member !== member) {
          acc.push({
            member: current.member,
          });
        }
        return acc;
      },
      []
    );

    const slotsArray = slotListState?.data.slots;
    slotsArray[index].slot = slot;
    slotsArray[index].members = redArr;

    setSlotListState({
      data: {
        ...slotListState.data,
        slots: [...slotsArray],
      },
    });
  };

  const handleChange = (index, slot, event) => {
    const reducedArray = slotListState?.data.slots.reduce((acc, current) => {
      const membersArray = current.members ? [...current.members] : [];
      if (current.slot === slot) {
        acc.push({
          members: [...membersArray, { member: event.target.value }],
          slot: slot,
        });
      } else {
        acc.push({
          members: [...membersArray],
          slot: current.slot,
        });
      }
      return acc;
    }, []);

    setSlotListState({
      data: {
        ...slotListState.data,
        slots: [...reducedArray],
      },
    });
  };

  const handleAddMember = () => {
    updateData(slotListState?.data);
  };

  return (
    <div>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Time Slot!</TableCell>
            <TableCell align="right">Students</TableCell>
            <TableCell align="right">Total Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slotListState?.data &&
            slotListState?.data?.slots?.map((row, index) => (
              <TableRow key={row.slot}>
                <TableCell component="th" scope="row" key={index + row.slot}>
                  {row.slot}
                </TableCell>
                <TableCell align="right" key={row.slot}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="unique-id"
                    key={row?.slot}
                    onChange={(e) => handleChange(index, row.slot, e)}
                  >
                    {memberListState?.data?.map(
                      (val) =>
                        !row?.members?.find((existingMember) => {
                          return existingMember?.member === val?.memberName;
                        }) && (
                          <MenuItem
                            value={val?.memberName}
                            key={row.slot + val.memberName}
                          >
                            <em>{val?.memberName}</em>
                          </MenuItem>
                        )
                    )}
                  </Select>
                  {row?.members &&
                    row?.members.map((val) => (
                      <Button
                        key={row.slot + val.member}
                        href="#contained-buttons"
                        onClick={(e) =>
                          handleMemberClick(index, val?.member, row?.slot, e)
                        }
                      >
                        {val.member}
                      </Button>
                    ))}
                </TableCell>
                <TableCell align="right">
                  {row?.members && row?.members?.length}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        key="1"
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={handleAddMember}
      >
        Add member and then Click Me!
      </Button>
      <Snackbar open={successAlertOpen} autoHideDuration={6000}>
        <Alert severity="success">Member(s) added successfully</Alert>
      </Snackbar>
      <Snackbar open={errorAlertOpen} autoHideDuration={6000}>
        <Alert severity="error">Failed to add member(s)</Alert>
      </Snackbar>
    </div>
  );
};

export default Slot;
