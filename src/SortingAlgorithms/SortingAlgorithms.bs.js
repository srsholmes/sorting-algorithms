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

function value(length, current) {
  var match = length === current;
  return Css.style(/* :: */[
              Css.height(Css.px(length)),
              /* :: */[
                Css.backgroundColor(match ? Css.red : Css.blue),
                /* :: */[
                  Css.display(Css.flexBox),
                  /* :: */[
                    Css.flexDirection(Css.row),
                    /* :: */[
                      Css.alignItems(Css.stretch),
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

function sleep(ms) {
  return new Promise((function (resolve, reject) {
                console.log("sksksk");
                setTimeout((function (param) {
                        return resolve(true);
                      }), ms);
                return /* () */0;
              }));
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
          if (Caml_obj.caml_greaterthan(a, b)) {
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
  sleep(100).then((function (value) {
          console.log("inside the promise");
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
                      className: value(length, state[/* current */1])
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
                      className: algoContainer
                    }, $$Array.of_list(bars)), React.createElement("button", {
                      className: sortButton,
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* SetSorting */Block.__(2, [!state[/* sorting */2]]));
                        })
                    }, "Start sorting:")));
}

var make = SortingAlgorithms;

exports.Styles = Styles;
exports.bubbleSort = bubbleSort;
exports.generateListOfN = generateListOfN;
exports.initialState = initialState;
exports.reducer = reducer;
exports.sleep = sleep;
exports.myFunc = myFunc;
exports.make = make;
/* title Not a pure module */
