const JumbotronElement = props => {
    return (
      <h1 style={{ backgroundColor: "lightgrey", padding: "10px"}} {...props.attributes}>
        {props.children}
      </h1>
    )
  }
export default JumbotronElement;