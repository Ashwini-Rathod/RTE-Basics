// Define a React component renderer for our code blocks.
const H1Element = props => {
    return (
      <h1 {...props.attributes}>
        {props.children}
      </h1>
    )
  }

const H2Element= props => {
    return (
        <h2 {...props.attributes}>
            {props.children}
        </h2>
    )
}
export {
    H1Element,
    H2Element,
};