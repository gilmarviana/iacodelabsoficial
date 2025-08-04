import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = { MENU: 'menu' };

export function DraggableMenuItem({ id, index, moveItem, children }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.MENU,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.MENU,
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>{children}</div>
  );
}
