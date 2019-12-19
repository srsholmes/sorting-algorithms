open Webapi.Dom;
open Styles;

let rec generateListOfN = (length: int) => {
  length <= 0 ? [] : [length, ...generateListOfN(length - 1)];
};

let sleep = ms => {
  let promise =
    Js.Promise.make((~resolve, ~reject) => {
      Js.log("sksksk");
      Js.Global.setTimeout(() => resolve(. true), ms);
      ();
    });
  promise;
};

type bob = {
  list: list(int),
  current: int,
  sorting: bool,
};

let initialState = {current: 0, list: [], sorting: false};

/* Action declaration */
type action =
  | SetList(list(int))
  | SetCurrent(int)
  | SetSorting(bool);

let reducer = (state, action) => {
  switch (action) {
  | SetList(l) => {...state, list: l}
  | SetCurrent(x) => {...state, current: x}
  | SetSorting(x) => {...state, sorting: x}
  };
};

let ben = ref(false);

let unwrapElement =
  fun
  | Some(v) => v
  | None => raise(Invalid_argument("Passed none to unwrap"));

let myFunc = (state, dispatch) => {
  let rec r_bubble_sort = l => {
    let rec try_swap =
      fun
      | [] => (false, [])
      | [a] => (false, [a])
      | [a, b, ...tail] =>
        if (a > b && ben^) {
          ben := false;
          document
          |> Document.querySelector({j| .bar-$(a)|j})
          |> unwrapElement
          |> Element.setAttribute("style", "background-color: red");

          //          document
          //          |> Document.querySelector({j| .bar-$(b)|j})
          //          |> unwrapElement
          //          |> Element.setAttribute("style", "background-color: green");

          (true, [b, ...snd(try_swap([a, ...tail]))]);
        } else {
          let (swapped, newlist) = try_swap([b, ...tail]);
          (swapped, [a, ...newlist]);
        };

    try_swap(l);
  };

  sleep(50)
  |> Js.Promise.then_(value => {
       ben := true;
       let (swapped, newlist) = r_bubble_sort(state.list);
       if (!swapped && state.sorting == true) {
         dispatch(SetSorting(false));
         dispatch(SetList(state.list));
       } else {
         dispatch(SetList(newlist));
       };
       Js.Promise.resolve(value);
     });

  ();
};

[@react.component]
let make = () => {
  let (listLength, setListLength) = React.useState(() => 80);
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect1(
    () => {
      let newShuffledList = generateListOfN(listLength) |> Belt_List.shuffle;
      dispatch(SetList(newShuffledList));
      None;
    },
    [|listLength|],
  );

  React.useEffect1(
    () => {
      switch (state.sorting) {
      | true => myFunc(state, dispatch)
      | _ => ()
      };
      None;
    },
    [|state|],
  );

  let valueBar = (~length) =>
    <div
      className={Styles.value(length) ++ " bar-" ++ string_of_int(length)}
    />;

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
        className=Styles.sortButton
        onClick={_ => dispatch(SetSorting(!state.sorting))}>
        {React.string("Start sorting:")}
      </button>
    </div>
  </div>;
};
