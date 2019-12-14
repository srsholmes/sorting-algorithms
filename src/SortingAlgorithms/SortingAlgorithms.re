let rec fill = (~element: 'a, ~length: int) =>
  if (length <= 0) {
    [];
  } else {
    [element, ...fill(~element, ~length=length - 1)];
  };

module Styles = {
  /* Open the Css module, so we can access the style properties below without prefixing them with Css. */
  open Css;

  let card =
    style([
      display(flexBox),
      flexDirection(column),
      alignItems(stretch),
      backgroundColor(white),
      boxShadow(Shadow.box(~y=px(3), ~blur=px(5), rgba(0, 0, 0, 0.3))),
      /* You can add non-standard and other unsafe style declarations using the `unsafe` function, with strings as the two arguments. */
      unsafe("-webkit-overflow-scrolling", "touch"),
      /* You can place all your theme styles in Theme.re and access as normal Reason module */
    ]);

  let title = style([fontSize(rem(1.5)), marginBottom(px(10))]);

  let actionButton = disabled =>
    style([
      background(disabled ? darkgray : white),
      color(black),
      border(px(1), solid, black),
      borderRadius(px(3)),
    ]);
};

let bob = () => <div className="value"> {React.string("Hello")} </div>;

[@react.component]
let make = () => {
  let (listLength, setListLength) = React.useState(() => 15);

  let myList = fill(bob(), listLength);
  <div>
    <p> {React.string("Hello!")} </p>
    <p> {React.string(string_of_int(listLength))} </p>
    <h1> {React.string("Controls")} </h1>
    <p> {React.string("Length of list to sort:")} </p>
    <input
      value={string_of_int(listLength)}
      onChange={event => {
        let myVal = event->ReactEvent.Form.target##value;
        setListLength(listLength => myVal);
      }}
      type_="range"
    />
    <div>
      <h2> {React.string("Bubble Sort:")} </h2>
      <div className="algoContainer">
        {ReasonReact.array(Array.of_list(myList))}
      </div>
    </div>
    <div className=Styles.card>
      <h1 className=Styles.title> {ReasonReact.string("Hello")} </h1>
      <button className={Styles.actionButton(false)} />
    </div>
  </div>;
};
