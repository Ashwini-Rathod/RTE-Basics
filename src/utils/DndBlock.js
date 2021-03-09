import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";
import {Transforms} from "slate";
import { useEditor, ReactEditor } from "slate-react";
import "./styles.css";

const DndBlock =(props)=> {
    // console.log(props);
    const editor = useEditor();
    const {element} = props;
    let path = ReactEditor.findPath(editor, element);
    console.log(path);
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        item: { type: props.element.type, element, path},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;
    // const styles = {
    //     cursor: "move",
    // }

    const [{handlerId}, drop] = useDrop({
        accept: props.element.type,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover: (item, monitor) => {
            if(!ref.current){
                return;
            }
           
            const dragIndex = item.path[0];
            const hoverIndex = path[0];
            console.log({dragIndex, hoverIndex});
            if(dragIndex === hoverIndex){
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
           
            if (dragIndex < hoverIndex && hoverClientY <= hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY >= hoverMiddleY) {
                return;
            }
        },
        drop: (item, monitor) => {
            const dragIndex = item.path[0];
            const hoverIndex = path[0];
            if(dragIndex === hoverIndex){
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
           
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            // item.path = hoverIndex;
        }
    });

    const moveItem = (dragIndex, hoverIndex) => {
        console.log({dragIndex, hoverIndex});
        Transforms.moveNodes(editor,
            {at: [dragIndex], to: [hoverIndex]},
        )
    }

    drag(drop(ref));

    return (
    <>
      <div style={{ opacity}} ref={ref} data-handler-id={handlerId} >
        {props.children}
      </div>
    </>
    );
     //isDragging ? (
    //   <div style={{ opacity, ...styles }} ref={ref} data-handler-id={handlerId}>
    //     {`Icon${props.children}`}
    //   </div>
    // ) : (
    
    
}

export default DndBlock;