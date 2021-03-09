const BlockQuoteElement = props => {
    return (
      <blockquote style={{color: "gray"}} {...props.attributes}>
         {props.children} 
      </blockquote>
    )
  }
export default BlockQuoteElement;