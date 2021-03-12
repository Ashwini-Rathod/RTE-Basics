import {useEditor} from "slate-react";

const Button = (props) =>{
    const editor = useEditor();
    const {toggleBlock, type, text} = props;
    if(!type){
      return(
        <>
        <button
          onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor);
          }}
        >
          {text}
        </button>
        </>
    )
    }
    return (
      <>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            const url = window.prompt("Enter the image URL: ");
            if (!url) {
              return;
            }
            toggleBlock(editor, url);
          }}
        >
          {text}
        </button>
      </>
    );
}

export default Button;