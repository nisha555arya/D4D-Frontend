const Spinner = (props) => {
  return (
    <div
      className={props.class === "loading-container" ? "loading-container" : ""}
    >
      <div
        className="spinner"
        style={{
          borderColor: props.color,
          height: props.height,
          width: props.width,
        }}
      ></div>
    </div>
  );
};
export default Spinner;
