import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { ColumnMapping } from "./LayoutItemList";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from "react-i18next";

const Droppable = ({ id, items }) => {
  const { t } = useTranslation();
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    padding: "20px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 110
  };

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} style={droppableStyle}>
        {t(ColumnMapping.find(item => item.key === id)?.label) || t('skinconfig.Item not found')}
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;
