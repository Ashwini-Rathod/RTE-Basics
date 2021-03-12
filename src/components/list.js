const UL = props => {
    return (
      <ul {...props.attributes}>
        <li>{props.children} </li>
      </ul>
    )
  }

const OL = props => {
    return (
      <ol {...props.attributes}>
        <li>{props.children}</li>
      </ol>
    )
}
export {
    UL,
    OL
}