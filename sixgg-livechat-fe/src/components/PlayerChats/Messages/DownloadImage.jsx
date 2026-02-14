import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const DownloadImage = ({ imageUrl }) => {
  const handleDownload = async () => {
    try {
      // Fetching the image as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Creating a temporary anchor tag to download the blob
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `download`); // You can give a dynamic filename based on your needs

      // Append to the body, click and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Free up the blob URL after the download
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <Icon
      fontSize={22}
      icon="material-symbols:download"
      onClick={handleDownload}
      color="#fff"
    />
  );
};

export default DownloadImage;
