import {useDrag, useDrop} from "react-dnd";
import {useRef, useState} from "react";
import {Transforms} from "slate";
import { useEditor, ReactEditor } from "slate-react";
import "./styles.css";
import { RiDragDropFill } from "react-icons/ri";

const DndBlock = (props) => {
  const [hover, setHover] = useState(false);
  const editor = useEditor();
  const { element } = props;
  const ref = useRef(null);

  const toggleHover = () => {
        if(hover){
            setHover(false);
        }
        else{
            setHover(true)
        }
    }

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "element", element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;

  const [{ handlerId }, drop] = useDrop({
    accept: "element",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
        if(!ref.current){
            return;
        }
        const dragIndex = ReactEditor.findPath(editor, item.element);
        const hoverIndex = ReactEditor.findPath(editor, element);
        if(dragIndex === hoverIndex){
            return;
        }
        console.log("Drag Index: ", dragIndex);
        console.log("Hover Index: ", hoverIndex);
    },
    drop: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = ReactEditor.findPath(editor, item.element);
      const hoverIndex = ReactEditor.findPath(editor, element);
      moveItem(dragIndex, hoverIndex);
    },
  });

  const moveItem = (dragIndex, hoverIndex) => {
    Transforms.moveNodes(editor, { at: dragIndex, to: hoverIndex });
  };

  drag(drop(ref));

  return (
    <div
      ref={preview}
      style={{ opacity }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      {hover ? (
        <div
          style={{ display: "inline-block" }}
          ref={ref}
          data-handler-id={handlerId}
        >
          <RiDragDropFill />
        </div>
      ) : (
        ""
      )}
      {props.children}
    </div>
  );
  // (
  //   <>
  //     <div
  //       style={{ opacity }}
  //       ref={ref}
  //       data-handler-id={handlerId}
  //       hover={props.hover}
  //     >
  //       {props.children}
  //     </div>
  //   </>
  // );
};

export default DndBlock;
