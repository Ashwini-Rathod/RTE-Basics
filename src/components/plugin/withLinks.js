import {CustomEditor} from "../CustomEditor";
import isUrl from "is-url";

const withLinks = editor => {
    const { insertData, insertText, isInline } = editor
  
    editor.isInline = element => {
      return element.type === 'link' ? true : isInline(element)
    }
  
    editor.insertText = text => {
      if (text && isUrl(text)) {
        CustomEditor.wrapLink(editor, text)
      } else {
        insertText(text)
      }
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain')
  
      if (text && isUrl(text)) {
        CustomEditor.wrapLink(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor
  }

  export default withLinks;