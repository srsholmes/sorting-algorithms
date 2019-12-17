module Styles = {
  /* Open the Css module, so we can access the style properties below without prefixing them with Css. */
  open Css;

  let title = style([fontSize(rem(1.5)), marginBottom(px(10))]);

  let algoContainer =
    style([
      display(flexBox),
      flexDirection(row),
      alignItems(stretch),
      marginLeft(px(10)),
      marginRight(px(10)),
      height(px(100)),
      justifyContent(spaceEvenly),
      overflow(hidden),
      alignItems(flexEnd),
    ]);

  let value = length =>
    style([
      height(px(length)),
      display(flexBox),
      flexDirection(row),
      alignItems(stretch),
      backgroundColor(black),
      width(px(5)),
    ]);

  let sortButton =
    style([color(black), borderRadius(px(3)), marginTop(px(20))]);
};

let valueBar = (~length) => <div className={Styles.value(length)} />;

let rec insert = (a: list(int), v: int) => {
  switch (List.length(a)) {
  | 0 => [v]
  | 1 => v > List.hd(a) ? [List.hd(a), v] : [v, List.hd(a)]
  | _ =>
    v < List.hd(a) ? [v, ...a] : [List.hd(a), ...insert(List.tl(a), v)]
  };
};

let sort = (a: list(int)) => {
  List.fold_left(insert, [], a);
};

type elementWithrecord = {
  element: ReasonReact.reactElement,
  length: int,
};

let rec generateListOfN = (length: int) => {
  length <= 0 ? [] : [length, ...generateListOfN(length - 1)];
};

[@react.component]
let make = () => {
  let (listLength, setListLength) = React.useState(() => 50);
  let (sorting, setSorting) = React.useState(() => false);
  let (shuffledList, setShuffledList) = React.useState(() => []);

  React.useEffect1(
    () => {
      let newShuffledList = generateListOfN(listLength) |> Belt_List.shuffle;
      setShuffledList(_ => newShuffledList);
      None;
    },
    [|listLength|],
  );

  let sortedList = sort(shuffledList);

  let bars =
    List.map(x => valueBar(~length=x), sorting ? sortedList : shuffledList);

  <div>
    <p> {React.string("Hello!")} </p>
    <p> {React.string(string_of_int(listLength))} </p>
    <h1> {React.string("Controls")} </h1>
    <p> {React.string("Length of list to sort:")} </p>
    <input
      value={string_of_int(listLength)}
      onChange={event => {
        let myVal = event->ReactEvent.Form.target##value;
        setListLength(_ => myVal);
      }}
      type_="range"
    />
    <div>
      <h2> {React.string("Bubble Sort:")} </h2>
      <div className=Styles.algoContainer>
        {ReasonReact.array(Array.of_list(bars))}
      </div>
      <button
        className=Styles.sortButton onClick={_ => setSorting(_ => !sorting)}>
        {React.string("Start sorting:")}
      </button>
    </div>
  </div>;
};
