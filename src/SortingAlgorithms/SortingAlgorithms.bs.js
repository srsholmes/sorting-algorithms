'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var Styles$ReasonReactExamples = require("../Styles.bs.js");

function generateListOfN(length) {
  var match = length <= 0;
  if (match) {
    return /* [] */0;
  } else {
    return /* :: */[
            length,
            generateListOfN(length - 1 | 0)
          ];
  }
}

function sleep(ms) {
  return new Promise((function (resolve, reject) {
                console.log("sksksk");
                setTimeout((function (param) {
                        return resolve(true);
                      }), ms);
                return /* () */0;
              }));
}

var initialState = /* record */[
  /* list : [] */0,
  /* current */0,
  /* sorting */false
];

function reducer(state, action) {
  switch (action.tag | 0) {
    case /* SetList */0 :
        return /* record */[
                /* list */action[0],
                /* current */state[/* current */1],
                /* sorting */state[/* sorting */2]
              ];
    case /* SetCurrent */1 :
        return /* record */[
                /* list */state[/* list */0],
                /* current */action[0],
                /* sorting */state[/* sorting */2]
              ];
    case /* SetSorting */2 :
        return /* record */[
                /* list */state[/* list */0],
                /* current */state[/* current */1],
                /* sorting */action[0]
              ];
    
  }
}

var ben = /* record */[/* contents */false];

function unwrapElement(param) {
  if (param !== undefined) {
    return Caml_option.valFromOption(param);
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Passed none to unwrap"
        ];
  }
}

function myFunc(state, dispatch) {
  var r_bubble_sort = function (l) {
    var try_swap = function (param) {
      if (param) {
        var match = param[1];
        var a = param[0];
        if (match) {
          var tail = match[1];
          var b = match[0];
          if (Caml_obj.caml_greaterthan(a, b) && ben[0]) {
            ben[0] = false;
            unwrapElement(Caml_option.nullable_to_opt(document.querySelector(" .bar-" + (String(a) + "")))).setAttribute("style", "background-color: red");
            return /* tuple */[
                    true,
                    /* :: */[
                      b,
                      try_swap(/* :: */[
                              a,
                              tail
                            ])[1]
                    ]
                  ];
          } else {
            var match$1 = try_swap(/* :: */[
                  b,
                  tail
                ]);
            return /* tuple */[
                    match$1[0],
                    /* :: */[
                      a,
                      match$1[1]
                    ]
                  ];
          }
        } else {
          return /* tuple */[
                  false,
                  /* :: */[
                    a,
                    /* [] */0
                  ]
                ];
        }
      } else {
        return /* tuple */[
                false,
                /* [] */0
              ];
      }
    };
    return try_swap(l);
  };
  sleep(50).then((function (value) {
          ben[0] = true;
          var match = r_bubble_sort(state[/* list */0]);
          if (!match[0] && state[/* sorting */2] === true) {
            Curry._1(dispatch, /* SetSorting */Block.__(2, [false]));
            Curry._1(dispatch, /* SetList */Block.__(0, [state[/* list */0]]));
          } else {
            Curry._1(dispatch, /* SetList */Block.__(0, [match[1]]));
          }
          return Promise.resolve(value);
        }));
  return /* () */0;
}

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 80;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var match$1 = React.useReducer(reducer, initialState);
  var dispatch = match$1[1];
  var state = match$1[0];
  React.useEffect((function () {
          var newShuffledList = Belt_List.shuffle(generateListOfN(listLength));
          Curry._1(dispatch, /* SetList */Block.__(0, [newShuffledList]));
          return ;
        }), /* array */[listLength]);
  React.useEffect((function () {
          var match = state[/* sorting */2];
          if (match) {
            myFunc(state, dispatch);
          }
          return ;
        }), /* array */[state]);
  var bars = List.map((function (x) {
          var length = x;
          return React.createElement("div", {
                      className: Styles$ReasonReactExamples.Styles.value(length) + (" bar-" + String(length))
                    });
        }), state[/* list */0]);
  return React.createElement("div", undefined, React.createElement("p", undefined, "Hello!"), React.createElement("p", undefined, String(listLength)), React.createElement("h1", undefined, "Controls"), React.createElement("p", undefined, "Length of list to sort:"), React.createElement("input", {
                  type: "range",
                  value: String(listLength),
                  onChange: (function ($$event) {
                      var myVal = $$event.target.value;
                      return Curry._1(setListLength, (function (param) {
                                    return myVal;
                                  }));
                    })
                }), React.createElement("div", undefined, React.createElement("h2", undefined, "Bubble Sort:"), React.createElement("div", {
                      className: Styles$ReasonReactExamples.Styles.algoContainer
                    }, $$Array.of_list(bars)), React.createElement("button", {
                      className: Styles$ReasonReactExamples.Styles.sortButton,
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* SetSorting */Block.__(2, [!state[/* sorting */2]]));
                        })
                    }, "Start sorting:")));
}

var make = SortingAlgorithms;

exports.generateListOfN = generateListOfN;
exports.sleep = sleep;
exports.initialState = initialState;
exports.reducer = reducer;
exports.ben = ben;
exports.unwrapElement = unwrapElement;
exports.myFunc = myFunc;
exports.make = make;
/* react Not a pure module */
