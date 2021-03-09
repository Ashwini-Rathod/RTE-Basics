const Checkbox = (props) =>{
  return (
    <div {...props.attributes}>
      <input type="checkbox"></input>
      <span>{props.children}</span>
    </div>
  );
}

export default Checkbox;