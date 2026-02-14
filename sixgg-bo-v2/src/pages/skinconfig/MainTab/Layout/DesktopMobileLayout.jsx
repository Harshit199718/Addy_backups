import React, { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import { arrayMove, insertAtIndex, removeAtIndex } from "./array";
import { ColumnMapping, initialGroup1, initialGroup2, initialGroup3, initialMobileGroup } from "./LayoutItemList";
import { Form } from "antd";
import { convertDNDLayout, reverseDNDLayout } from "../../../../components/generalConversion";

const DesktopMobileLayout = ({ apiErrors, initialValues, watchValue, t }) => {
  const [desktopItems, setDesktopItems] = useState({});
  const [mobileItems, setMobileItems] = useState({});

  useEffect(() => {
    const combinedDesktopInitialGroup = [
      ...initialGroup1,
      ...initialGroup2,
      ...initialGroup3
    ];

    const reverseDesktopItems = reverseDNDLayout(initialValues?.desktop_layout_home, 3, combinedDesktopInitialGroup);
    const reverseMobileItems = reverseDNDLayout(initialValues?.mobile_layout_home, 1, initialMobileGroup);

    reverseDesktopItems ? 
      setDesktopItems(reverseDesktopItems) 
    :
      setDesktopItems({
        group1: initialGroup1,
        group2: initialGroup2,
        group3: initialGroup3
      })
    reverseMobileItems ? 
      setMobileItems(reverseMobileItems) 
    :
      setMobileItems({
        group1: initialMobileGroup,
      })
    
  },[initialValues])

  useEffect(() => {
    const transformedDesktopItems = convertDNDLayout(desktopItems);
    const transformedMobileItems = convertDNDLayout(mobileItems);
    watchValue.setFieldsValue({
      desktop_layout_home: JSON.stringify(transformedDesktopItems),
      mobile_layout_home: JSON.stringify(transformedMobileItems),
    });
  },[desktopItems, mobileItems])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setDesktopItems((items) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setDesktopItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            )
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }
  };

  const mobileSensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleMobileDragOver = ({ over, active }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setMobileItems((items) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleMobileDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setMobileItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            )
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
    };
  };

  const containerStyle = { display: "flex" };

  return (
    <div style={{ display: "flex" }}>
      <Form.Item
        name="desktop_layout_home"
        label={t("skinconfig.Desktop Layout Home")}
        validateStatus={apiErrors.desktop_layout_home ? 'error' : ''}
        help={apiErrors.desktop_layout_home}
        hasFeedback
        style={{ marginRight: "200px"}}
        >
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div style={containerStyle}>
              {Object.keys(desktopItems).map((group) => (
                <Droppable id={group} items={desktopItems[group]} key={group} />
              ))}
            </div>
          </DndContext>
      </Form.Item>

      <Form.Item
        name="mobile_layout_home"
        label={t("skinconfig.Mobile Layout Home")}
        validateStatus={apiErrors.mobile_layout_home ? 'error' : ''}
        help={apiErrors.mobile_layout_home}
        hasFeedback
        >
          <DndContext
            sensors={mobileSensors}
            onDragEnd={handleMobileDragEnd}
            onDragOver={handleMobileDragOver}
          >
            <div style={containerStyle}>
              {Object.keys(mobileItems).map((group) => (
                <Droppable id={group} items={mobileItems[group]} key={group} />
              ))}
            </div>
          </DndContext>
      </Form.Item>
    </div>
  );
}

export default DesktopMobileLayout;
