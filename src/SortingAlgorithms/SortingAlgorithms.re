let rec fill = (~element: 'a, ~length: int) =>
  if (length <= 0) {
    [];
  } else {
    [element, ...fill(~element, ~length=length - 1)];
  };

let bob = () => <div className="value"> {React.string("Hello")} </div>;

[@react.component]
let make = () => {
  let (listLength, setListLength) = React.useState(() => 0);

  let myList = fill(bob(), listLength);

  <div>
    <div>
      <p> {React.string("Hello!")} </p>
      <p> {React.string("World!")} </p>
      <p> {React.string(string_of_int(listLength))} </p>
      <input
        value={string_of_int(listLength)}
        onChange={event => {
          let myVal = event->ReactEvent.Form.target##value;
          setListLength(listLength => myVal);
        }}
        type_="range"
      />
      <div className="algoContainer">
        {ReasonReact.array(Array.of_list(myList))}
      </div>
    </div>
  </div>;
};
