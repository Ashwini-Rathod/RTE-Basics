import imageExtensions from "image-extensions";
import isUrl from "is-url";
import {insertImage} from "../../App";

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;
    console.log("Files", files);

    if (files && files.length > 0) {
      for (const file of files) {
        console.log("A File", file);
        const reader = new FileReader();
        console.log("Reader: ", reader);
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            console.log("Url", url);
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    console.log("Ext from imageurl", ext);
    return imageExtensions.includes(ext)
  }

export default withImages;
