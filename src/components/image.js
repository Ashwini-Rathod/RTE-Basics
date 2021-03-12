// import { useSelected, useFocused } from "slate-react";

const Image = ({attributes, element, children}) => {
    return(
        <div {...attributes} >
            {/* <div contentEditable={false}> */}
                <img
                    src={element.url}
                    alt="demo"
                    style={{ display: "block", maxWidth: "100%", maxHeight: "20em"}}
                ></img>
                {children}
            {/* </div> */}
        </div>
    )
}

export default Image;