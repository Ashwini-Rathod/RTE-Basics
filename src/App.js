import {useState, useMemo, useCallback } from "react";
import { createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import CodeElement from "./components/code";
import DefaultElement from "./components/default";
import Leaf from "./components/leaf";
import {CustomEditor} from "./components/CustomEditor";
import { H1Element, H2Element } from "./components/header1";
import BlockQuoteElement from "./components/blockquote";
import {UL, OL} from "./components/list";
import JumbotronElement from "./components/jumbotron";
import RemoveNode from "./components/removeNode";
import Image from "./components/image";
import withImages from"./components/plugin/withImage";
import Video from "./components/video";
import Link from "./components/link";
import withLinks from "./components/plugin/withLinks";
import Checkbox from "./components/checkbox";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import DndBlock from "./utils/DndBlock";

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
  {
    id: '1',
    index: '0',
    type: 'checkbox',
    children: [{text: 'First Checkbox'}]
  },
  {
    id: '2',
    index: '1',
    type: 'checkbox',
    children: [{text: 'Second Checkbox'}]
  },
  {
    id: '3',
    index: '2',
    type: 'checkbox',
    children: [{text: 'Third Checkbox'}]
  },
  {
    id: '4',
    index: '3',
    type: 'checkbox',
    children: [{text: 'Fourth Checkbox'}]
  }
]

function App() {
  const editor = useMemo(()=> withImages(withLinks( withReact(createEditor()))), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback( props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props}  />
      case 'header1':
        return <H1Element {...props}/>
      case 'header2':
        return <H2Element {...props}/>
      case 'blockQuote':
        return <BlockQuoteElement {...props}/>
      case 'ul':
        return <UL {...props}/>
      case "ol":
        return <OL {...props}/>
      case 'jumbotron':
        return <JumbotronElement {...props}/>
      case 'remove':
        return <RemoveNode {...props}/>
      case 'image':
        return <Image {...props}/>
      case 'video':
        return <Video {...props}/>
      case 'link':
        return <Link {...props}/>
      case 'checkbox':
        return <Checkbox {...props}/>
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props}/>
  }, []);

  return (
    <Slate
    editor={editor}
    value={value}
    onChange={newValue => setValue(newValue)}
  >
    <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          B
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          C
        </button>

             <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleHeader1Block(editor)
          }}
        >
          H1
        </button>

        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleHeader2Block(editor)
          }}
        >
          H2
        </button>

        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBlockQuoteBlock(editor)
          }}
        >
          Q
        </button>


        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleULBlock(editor)
          }}
        >
          UL
        </button>

        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleOLBlock(editor)
          }}
        >
          OL
        </button>

        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleJumbotronBlock(editor)
          }}
        >
          J
        </button>

        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleItalicBlock(editor)
          }}
        >
          It
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleUnderlineBlock(editor)
          }}
        >
          U
        </button>
        <button
          onMouseDown ={event => {
            event.preventDefault()
            CustomEditor.removeNode(editor);
          }}
        >
          D
        </button>
        <button
          onMouseDown = {event => {
            event.preventDefault()
            CustomEditor.toggleCheckBox(editor);
          }}
        >
          Ch
        </button>
        <button
          onMouseDown = {event => {
            event.preventDefault()
            const url = window.prompt("Enter the image URL: ");
            if(!url){
              return
            }
            insertImage(editor, url);
          }}
        >I</button>
          <button
          onMouseDown = {event => {
            event.preventDefault()
            const url = window.prompt("Enter the video embed URL: ");
            if(!url){
              return
            }
            insertVideo(editor, url);
          }}
        >V</button>
         <button
          onMouseDown = {event => {
            event.preventDefault()
            const url = window.prompt("Enter the url: ");
            console.log("URL: ", url);
            if(!url){
              return
            }
            insertLink(editor, url);
          }}
        >L</button>
      </div>
      
    <DndProvider backend={HTML5Backend}>
    {/* <DndBlock> */}
      <Editable  
        renderElement= {(props)=> (<DndBlock {...props}>{renderElement(props)}</DndBlock>)}
        renderLeaf ={renderLeaf}
      />
    {/* </DndBlock> */}
    </DndProvider>
  </Slate>
  )
}


export const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const insertVideo = (editor, url) => {
  const text = { text: '' }
  const video = { type: 'video', url, children: [text] }
  Transforms.insertNodes(editor, video)
}

export const insertLink = (editor, url) => {
  if(editor.selection){
   CustomEditor.wrapLink(editor, url);
  }
}

export default App;
