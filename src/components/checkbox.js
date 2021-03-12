// import {useState} from "react";
// import { RiDragDropFill } from "react-icons/ri";
// import DndBlock from "../utils/DndBlock";

const Checkbox = (props) =>{
  return (
      <div {...props.attributes} style={{display: "inline"}}>
        <input type="checkbox"></input>
        <span>{props.children}</span>
      </div>
  );
}

export default Checkbox;