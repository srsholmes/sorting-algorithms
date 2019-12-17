'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");

var title = Css.style(/* :: */[
      Css.fontSize(Css.rem(1.5)),
      /* :: */[
        Css.marginBottom(Css.px(10)),
        /* [] */0
      ]
    ]);

var algoContainer = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.row),
        /* :: */[
          Css.alignItems(Css.stretch),
          /* :: */[
            Css.marginLeft(Css.px(10)),
            /* :: */[
              Css.marginRight(Css.px(10)),
              /* :: */[
                Css.height(Css.px(100)),
                /* :: */[
                  Css.justifyContent(Css.spaceEvenly),
                  /* :: */[
                    Css.overflow(Css.hidden),
                    /* :: */[
                      Css.alignItems(Css.flexEnd),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

function value(length) {
  return Css.style(/* :: */[
              Css.height(Css.px(length)),
              /* :: */[
                Css.display(Css.flexBox),
                /* :: */[
                  Css.flexDirection(Css.row),
                  /* :: */[
                    Css.alignItems(Css.stretch),
                    /* :: */[
                      Css.backgroundColor(Css.black),
                      /* :: */[
                        Css.width(Css.px(5)),
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var sortButton = Css.style(/* :: */[
      Css.color(Css.black),
      /* :: */[
        Css.borderRadius(Css.px(3)),
        /* :: */[
          Css.marginTop(Css.px(20)),
          /* [] */0
        ]
      ]
    ]);

var Styles = {
  title: title,
  algoContainer: algoContainer,
  value: value,
  sortButton: sortButton
};

function valueBar(length) {
  return React.createElement("div", {
              className: value(length)
            });
}

function bubbleSort(_s) {
  while(true) {
    var s = _s;
    var _bsort = function (s) {
      if (s) {
        var match = s[1];
        if (match) {
          var xs = match[1];
          var x2 = match[0];
          var x = s[0];
          if (Caml_obj.caml_greaterthan(x, x2)) {
            return /* :: */[
                    x2,
                    _bsort(/* :: */[
                          x,
                          xs
                        ])
                  ];
          } else {
            return /* :: */[
                    x,
                    _bsort(/* :: */[
                          x2,
                          xs
                        ])
                  ];
          }
        } else {
          return s;
        }
      } else {
        return s;
      }
    };
    var t = _bsort(s);
    if (Caml_obj.caml_equal(t, s)) {
      return t;
    } else {
      _s = t;
      continue ;
    }
  };
}

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

var initialState = /* record */[
  /* list : [] */0,
  /* current */0
];

function reducer(state, action) {
  if (action.tag) {
    return /* record */[
            /* list */state[/* list */0],
            /* current */action[0]
          ];
  } else {
    return /* record */[
            /* list */action[0],
            /* current */state[/* current */1]
          ];
  }
}

function myFunc(state, dispatch) {
  console.log("myFunc");
  setTimeout((function (param) {
          console.log("Timeout");
          var bubbleSorted = bubbleSort(state[/* list */0]);
          return Curry._1(dispatch, /* SetList */Block.__(0, [bubbleSorted]));
        }), 3000);
  return /* () */0;
}

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 80;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var match$1 = React.useState((function () {
          return false;
        }));
  var setSorting = match$1[1];
  var sorting = match$1[0];
  var match$2 = React.useReducer(reducer, initialState);
  var dispatch = match$2[1];
  var state = match$2[0];
  console.log("@@@@@");
  console.log(state);
  React.useEffect((function () {
          var newShuffledList = Belt_List.shuffle(generateListOfN(listLength));
          Curry._1(dispatch, /* SetList */Block.__(0, [newShuffledList]));
          return ;
        }), /* array */[listLength]);
  React.useEffect((function () {
          if (sorting) {
            myFunc(state, dispatch);
          }
          return ;
        }), /* array */[sorting]);
  var bars = List.map(valueBar, state[/* list */0]);
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
                      className: algoContainer
                    }, $$Array.of_list(bars)), React.createElement("button", {
                      className: sortButton,
                      onClick: (function (param) {
                          return Curry._1(setSorting, (function (param) {
                                        return !sorting;
                                      }));
                        })
                    }, "Start sorting:")));
}

var make = SortingAlgorithms;

exports.Styles = Styles;
exports.valueBar = valueBar;
exports.bubbleSort = bubbleSort;
exports.generateListOfN = generateListOfN;
exports.initialState = initialState;
exports.reducer = reducer;
exports.myFunc = myFunc;
exports.make = make;
/* title Not a pure module */
