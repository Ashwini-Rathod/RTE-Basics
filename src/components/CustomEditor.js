import {Editor, Transforms, Range, Element} from "slate"

export const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
  
      return !!match
    },

    isItalicActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true,
      })
  
      return !!match
    },

    isUnderlineActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.underline === true,
        universal: true,
      })
  
      return !!match
    },

    isJumbotronBlockActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'jumbotron',
      })

      return !!match
    },

    isCheckboxActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'checkbox',
      })

      return !!match
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },

    isBlockQuoteBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'blockQuote',
      })
  
      return !!match
    },

    isHeader1BlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'header1',
      })
  
      return !!match
    },


    isHeader2BlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'header2',
      })
  
      return !!match
    },
    
    isULActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'ul',
      })
  
      return !!match
    },

    isOLActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'ol',
      })
  
      return !!match
    },

    isLinkActive(editor){
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'link' && !Editor.isEditor(n) && Element.isElement(n) 
      })
      return !!match
    },

    unwrapLink(editor){
      Transforms.unwrapNodes(editor, 
        {match: n => n.type === 'link' && !Editor.isEditor(n) && Element.isElement(n)}
        )
    },

    wrapLink(editor, url){
      if(CustomEditor.isLinkActive){
        CustomEditor.unwrapLink(editor);
      }
      const {selection} = editor;
      const isCollapsed = selection && Range.isCollapsed(selection);
      const link = {
        type: 'link',
        url,
        children:  [{ text: url }] ,
      }
    
      if (isCollapsed) {
        Transforms.insertNodes(editor, link)
      } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
      }
    },

    toggleBoldMark(editor) {
      // const {selection} = editor;
      const isActive = CustomEditor.isBoldMarkActive(editor)
      if(isActive){
        Editor.removeMark(editor, 'bold');
      }
      else{
        Editor.addMark(editor, 'bold', true);
        // let selected;
        // if (selection !== null && selection.anchor !== null) {
        //   selected = editor.children[selection.anchor.path[0]];
        //   console.log(selected);
        // } else {
        //   selected = null;
        // }
        // let child = Node.child(editor, 1);
        // console.log(child);
        // console.log(selection.anchor.path);
        // let des = Node.descendant(editor, [])
        // console.log(des);
        // console.log(selection);
        // let test = Editor.parent(editor, selection);
        // console.log(test)
      }
    },

    toggleItalicBlock(editor) {
      const isActive = CustomEditor.isItalicActive(editor)
      if(isActive){
        Editor.removeMark(editor, 'italic');
      }
      else{
        Editor.addMark(editor, 'italic', true);
      }
    },

    toggleUnderlineBlock(editor) {
      const isActive = CustomEditor.isUnderlineActive(editor)
      if(isActive){
        Editor.removeMark(editor, 'underline');
      }
      else{
        Editor.addMark(editor, 'underline', true);
      }
    },
  
    toggleCodeBlock(editor) {
      console.log("Editor from toggle code block: ",editor.children);
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
    

    toggleJumbotronBlock(editor) {
      const isActive = CustomEditor.isJumbotronBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'jumbotron' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },

    toggleCheckBox(editor) {
      // console.log("value", value);
      const isActive = CustomEditor.isCheckboxActive(editor);
      // console.log("is Active: ",isActive);
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'checkbox' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },

    toggleBlockQuoteBlock(editor) {
      const isActive = CustomEditor.isBlockQuoteBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'blockQuote' },
        { match: n => Editor.isBlock(editor, n) },
      )
    },

    toggleHeader1Block(editor) {
      // const {selection} = editor;
      // console.log("Anchor", selection.anchor.path);
      const isActive = CustomEditor.isHeader1BlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'header1' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },

    toggleHeader2Block(editor) {
      const isActive = CustomEditor.isHeader2BlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'header2' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },

    toggleULBlock(editor){
      const isActive = CustomEditor.isULActive(editor)
      Transforms.setNodes(
        editor,
        {type: isActive ? null : 'ul'},
        {match: n => Editor.isBlock(editor, n)}
      )
    },

    toggleOLBlock(editor){
      const isActive = CustomEditor.isOLActive(editor)
      Transforms.setNodes(
        editor,
        {type: isActive ? null : 'ol'},
        {match: n => Editor.isBlock(editor, n)}
      )
    },

    removeNode(editor){
      Transforms.delete(
        editor,
        {at: editor.selection},
        {type: 'removeNode'},
        {match: n=> Editor.isBlock(editor, n)}
      )
    }
  }