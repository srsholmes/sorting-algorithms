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

  let value = (length, current) =>
    style([
      height(px(length)),
      backgroundColor(length === current ? red : blue),
      display(flexBox),
      flexDirection(row),
      alignItems(stretch),
      width(px(5)),
    ]);

  let sortButton =
    style([color(black), borderRadius(px(3)), marginTop(px(20))]);
};

let rec bubbleSort = s => {
  let rec _bsort =
    fun
    | [x, x2, ...xs] when x > x2 => {
        let semiSorted = [x2, ..._bsort([x, ...xs])];
        semiSorted;
      }
    | [x, x2, ...xs] => {
        let semiSorted = [x, ..._bsort([x2, ...xs])];
        semiSorted;
      }
    | s => s;
  let t = _bsort(s);
  if (t == s) {
    t;
  } else {
    let bob = bubbleSort(t);
    bob;
  };
};

let rec generateListOfN = (length: int) => {
  length <= 0 ? [] : [length, ...generateListOfN(length - 1)];
};

type bob = {
  list: list(int),
  current: int,
};

let initialState = {current: 0, list: []};

/* Action declaration */
type action =
  | SetList(list(int))
  | SetCurrent(int);

let reducer = (state, action) => {
  switch (action) {
  | SetList(l) => {...state, list: l}
  | SetCurrent(x) => {...state, current: x}
  };
};

let myFunc = (state, dispatch) => {
  Js.log("myFunc");

  Js.Global.setTimeout(() => dispatch(SetCurrent(state.current + 1)), 200);
  ();
};

[@react.component]
let make = () => {
  let (listLength, setListLength) = React.useState(() => 80);
  let (sorting, setSorting) = React.useState(() => false);
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect1(
    () => {
      let newShuffledList = generateListOfN(listLength) |> Belt_List.shuffle;
      dispatch(SetList(newShuffledList));
      None;
    },
    [|listLength|],
  );

  React.useEffect2(
    () => {
      Js.log("Use effect");
      switch (sorting) {
      | true => myFunc(state, dispatch)
      | _ => ()
      };
      None;
    },
    (sorting, state),
  );

  Js.log(state.current);

  let valueBar = (~length) =>
    <div className={Styles.value(length, state.current)} />;

  let bars = List.map(x => valueBar(~length=x), state.list);

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
