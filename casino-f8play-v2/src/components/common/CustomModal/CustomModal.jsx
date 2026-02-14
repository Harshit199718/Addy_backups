import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import "./CustomModal.css"

const _style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  background: "linear-gradient(to right, #0A609D, #06458B, #09387F)",
  boxShadow: 24,
  maxHeight: "100%",
  // height:"95%"
};

export default function CustomModal({
  children,
  open,
  onClose,
  style,
  title,
  titleStyle,
  containerStyle,
  modalStyle,
  container
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="custom-transition-modal"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      style={modalStyle?modalStyle:null}
      container={container}
    >
      <Fade in={open}>
        <Box sx={{..._style, ...containerStyle}}>
          <div style={{...style,borderRadius: "15px", paddingTop: "1rem", paddingBottom: "1rem"}} className="ant-modal-content">
            {title && <h4 style={{ paddingBottom: "0.5rem", textAlign: "center", fontSize: "1em", color: "#fff", ...titleStyle }}>{title}</h4>}
            {
              onClose ? 
            <div
              onClick={onClose}
              className="modal-close"
              style={{color:"white", position: "absolute", right: "12px", top: "12px", padding:"3px", background:"#CD0001", borderRadius:"6px" }}
            >
              <Icon icon="iconamoon:close-bold" />
            </div> : null
            }
            {children}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
