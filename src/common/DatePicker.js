import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState from "material-ui-popup-state";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(() => ({
  color: "#a1a1a1",
  border: "none",
  "&:hover": {
    color: "#a1a1a1",
    border: "none",
    background: "#ffffff",
  },
}));

export default function PopoverPopupState({setToDateExp,setFromDateExp}) {
  const [toDate, setToDate] = React.useState("");
  const [change, setChange] = useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [date,setDate] = useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDate(`${toDate}-${fromDate}`);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changeDate = (e, label) => {
    const { value } = e.target;
    if (value.length > 7) return;
    const digitsOnly = value.replace(/\D/g, "");
    let formattedInput = digitsOnly.substr(0, 2);
    if (Number(formattedInput) > 12) {
      return;
    } else if (digitsOnly.length > 2) {
      formattedInput += "/" + digitsOnly.substr(2, 10);
    }
    if(label === "to"){
        setToDate(formattedInput) 
        setToDateExp(formattedInput)
        return
    } 
    setFromDate(formattedInput);
    setFromDateExp(formattedInput);
  };

  const reset = () => {
    setToDate("");
    setFromDate("");
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {() => (
        <div>
          <ColorButton
            variant="outlined"
            disableElevation
            onClick={handleClick}
          >
            {date? date: "Add timeline"}
          </ColorButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <div className="mb-2 block">
                  <p>Enter Start Date</p>
                </div>
                <Input
                  id="maxsqft"
                  onChange={(e) => changeDate(e, "from")}
                  placeholder="MM/YYYY"
                  value={fromDate}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <p>Enter End Date</p>
                </div>
                <Input
                  id="maxsqft"
                  onChange={(e) => changeDate(e, "to")}
                  placeholder="MM/YYYY"
                  value={toDate}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => reset(false)}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleClose}
                >
                  Save
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

