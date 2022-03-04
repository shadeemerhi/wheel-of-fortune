import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Amount from "./WheelSpin/Amount";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Montserrat",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  height: 260,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

type TransitionsModalProps = {
  open: boolean;
  handleOpen?: any;
  handleClose?: any;
};

const TransitionsModal: React.FC<TransitionsModalProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Amount textSpin />
            <br />
            <button className="btn_primary mdlg_text" onClick={handleClose}>
              Answer Question
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
