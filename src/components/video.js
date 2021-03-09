
const Video = ({attributes, children, element}) =>{
    return(
    <div {...attributes} contentEditable={false}>
        <div 
            style={{
                padding: '75% 0 0 0',
                position: 'relative',
            }}
        >
             <iframe
             title= "video"
            src={`${element.url}`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        {children}
    </div>
    )
}

export default Video;