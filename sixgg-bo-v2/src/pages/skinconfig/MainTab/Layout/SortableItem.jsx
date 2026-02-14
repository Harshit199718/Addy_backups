import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DesktopMapping } from "./LayoutItemList";
import { useTranslation } from "react-i18next";

const SortableItem = (props) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 120,
    height: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box"
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {t(DesktopMapping.find(item => item.key === props.id)?.label) || t('skinconfig.Item not found')}
      {/* {props.id} */}
    </div>
  );
};

export default SortableItem;
