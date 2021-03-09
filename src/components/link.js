const Link = ({attributes, children, element}) =>{
    return(
        <a {...attributes} href={element.url}>
            {children}
        </a>
    )
}

export default Link;