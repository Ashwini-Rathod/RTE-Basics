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
import Button from "./components/Button";
// import { RiDragDropFill } from "react-icons/ri";

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
    children: [{ text: 'Hey there!!' }],
  },
  {
    id: '1',
    index: '5',
    type: 'checkbox',
    children: [{text: 'First Checkbox'}]
  },
  {
    id: '2',
    index: '6',
    type: 'checkbox',
    children: [{text: 'Second Checkbox'}]
  },
  {
    id: '3',
    index: '7',
    type: 'checkbox',
    children: [{text: 'Third Checkbox'}]
  },
  {
    id: '4',
    index: '8',
    type: 'checkbox',
    children: [{text: 'Fourth Checkbox'}]
  }
]

function App() {
  // const [hover, setHover] = useState(false);

  // const toggleHover = () => {
  //   if(hover === false){
  //       setHover(true);
  //   }
  //   else{
  //       setHover(false);
  //   }
  // };

  const editor = useMemo(()=> withImages(withLinks( withReact(createEditor()))), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback( props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props}/>
      case 'header1':
        return <H1Element {...props}/>
      case 'header2':
        return <H2Element {...props}/>
      case 'blockQuote':
        return <BlockQuoteElement {...props}/>
      case 'ul':
        return  <UL {...props}/>
      case "ol":
        return <OL {...props}/>
      case 'jumbotron':
        return <JumbotronElement {...props}/>
      case 'remove':
        return <RemoveNode {...props}/>
      case 'image':
        return <Image {...props}/>
      case 'video':
        return  <Video {...props}/>
      case 'link':
        return <Link {...props}/>
      case 'checkbox':
        return <Checkbox {...props}/>
      default:
        return <DefaultElement {...props}/>
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
        <Button text={"B"} toggleBlock={CustomEditor.toggleBoldMark}/>
        <Button text={"C"} toggleBlock={CustomEditor.toggleCodeBlock}/>
        <Button text={"H1"} toggleBlock={CustomEditor.toggleHeader1Block}/>
        <Button text={"H2"} toggleBlock={CustomEditor.toggleHeader2Block}/>
        <Button text={"Q"} toggleBlock={CustomEditor.toggleBlockQuoteBlock}/>
        <Button text={"UL"} toggleBlock={CustomEditor.toggleULBlock}/>
        <Button text={"OL"} toggleBlock={CustomEditor.toggleOLBlock}/>
        <Button text={"J"} toggleBlock={CustomEditor.toggleJumbotronBlock}/>
        <Button text={"It"} toggleBlock={CustomEditor.toggleItalicBlock}/>
        <Button text={"U"} toggleBlock={CustomEditor.toggleUnderlineBlock}/>
        <Button text={"D"} toggleBlock={CustomEditor.removeNode}/>
        <Button text={"Ch"} toggleBlock={CustomEditor.toggleCheckBox}/>
        <Button text={"I"} toggleBlock={insertImage} type={"image"}/>
        <Button text={"V"} toggleBlock={insertImage} type={"video"}/>
        <Button text={"L"} toggleBlock={insertImage} type={"link"}/>
      </div>
      
    <DndProvider backend={HTML5Backend}>
      <Editable  
        renderElement= {(props) => (<DndBlock {...props}>{renderElement(props)}</DndBlock>)}
        // renderElement={renderElement}
        renderLeaf ={renderLeaf}
      />
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
