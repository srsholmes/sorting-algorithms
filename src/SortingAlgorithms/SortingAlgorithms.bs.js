'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
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

function insert(a, v) {
  var match = List.length(a);
  if (match !== 0) {
    if (match !== 1) {
      var match$1 = v < List.hd(a);
      if (match$1) {
        return /* :: */[
                v,
                a
              ];
      } else {
        return /* :: */[
                List.hd(a),
                insert(List.tl(a), v)
              ];
      }
    } else {
      var match$2 = v > List.hd(a);
      if (match$2) {
        return /* :: */[
                List.hd(a),
                /* :: */[
                  v,
                  /* [] */0
                ]
              ];
      } else {
        return /* :: */[
                v,
                /* :: */[
                  List.hd(a),
                  /* [] */0
                ]
              ];
      }
    }
  } else {
    return /* :: */[
            v,
            /* [] */0
          ];
  }
}

function sort(a) {
  return List.fold_left(insert, /* [] */0, a);
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

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 50;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var match$1 = React.useState((function () {
          return false;
        }));
  var setSorting = match$1[1];
  var sorting = match$1[0];
  var match$2 = React.useState((function () {
          return /* [] */0;
        }));
  var setShuffledList = match$2[1];
  var shuffledList = match$2[0];
  React.useEffect((function () {
          var newShuffledList = Belt_List.shuffle(generateListOfN(listLength));
          Curry._1(setShuffledList, (function (param) {
                  return newShuffledList;
                }));
          return ;
        }), /* array */[listLength]);
  var sortedList = List.fold_left(insert, /* [] */0, shuffledList);
  var bars = List.map(valueBar, sorting ? sortedList : shuffledList);
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
exports.insert = insert;
exports.sort = sort;
exports.generateListOfN = generateListOfN;
exports.make = make;
/* title Not a pure module */
