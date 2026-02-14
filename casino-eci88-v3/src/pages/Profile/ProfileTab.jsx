import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "../../components/common/Image";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

const ProfileTab = ({
  icon,
  text,
  route,
  defaultRoute,
  defaultIcon,
  defaultText,
}) => {
  const {text_color} = useSelector(selectConfigData);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(route ? `/${route}` : defaultRoute);
  };

  const imageOrIcon = icon ? (
    <Image
      src={icon}
      alt=""
      width="50px"
      height="50px"
      style={{ objectFit: "contain" }}
    />
  ) : (
    <Icon fontSize="50px" color={text_color} icon={defaultIcon} />
  );

  return (
    <div style={{ textAlign: "center" }} onClick={handleClick}>
      {imageOrIcon}
      <h3 className="route-name">{text ? text : defaultText}</h3>
    </div>
  );
};

export default ProfileTab;
