import { Dialog } from "@mui/material";
import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

const shareStyle = {
  display: "flex",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "0.5rem",
  flexWrap: "wrap",
  zIndex: "30",
  position: "absolute",
  right: "15px",
  top: "32px",
  padding: "5px 10px",
  border: "1px solid rgb(216 225 234/1)",
  cursor: "pointer",
  borderRadius: "5px",
  background: "rgb(250 251 255/1)",
};

const ShareMenu = ({ shareUrl }) => {
  return (
    <div style={shareStyle}>
      <FacebookShareButton
        url={shareUrl}
        quote={"hello"}
        hashtag={"#anushri rawat"}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <EmailShareButton
        url={shareUrl}
        quote={"hello"}
        hashtag={"#anushri rawat"}
      >
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
      <TwitterShareButton
        url={shareUrl}
        quote={"hello"}
        hashtag={"#anushri rawat"}
      >
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton
        url={shareUrl}
        quote={"hello"}
        hashtag={"#anushri rawat"}
      >
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={shareUrl}
        quote={"hello"}
        hashtag={"#anushri rawat"}
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareMenu;
