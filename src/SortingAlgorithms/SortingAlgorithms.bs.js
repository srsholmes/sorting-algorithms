'use strict';

var Css = require("bs-css/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_List = require("bs-platform/lib/js/belt_List.js");

var card = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.column),
        /* :: */[
          Css.alignItems(Css.stretch),
          /* :: */[
            Css.backgroundColor(Css.white),
            /* :: */[
              Css.boxShadow(Css.Shadow.box(undefined, Css.px(3), Css.px(5), undefined, undefined, Css.rgba(0, 0, 0, 0.3))),
              /* :: */[
                Css.unsafe("-webkit-overflow-scrolling", "touch"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

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

function actionButton(disabled) {
  return Css.style(/* :: */[
              Css.background(disabled ? Css.darkgray : Css.white),
              /* :: */[
                Css.color(Css.black),
                /* :: */[
                  Css.border(Css.px(1), Css.solid, Css.black),
                  /* :: */[
                    Css.borderRadius(Css.px(3)),
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

var Styles = {
  card: card,
  title: title,
  algoContainer: algoContainer,
  value: value,
  actionButton: actionButton
};

function valueBar(length) {
  return React.createElement("div", {
              className: value(length)
            });
}

function getValueBars(length) {
  var el = valueBar(length);
  var match = length <= 0;
  if (match) {
    return /* [] */0;
  } else {
    return /* :: */[
            el,
            getValueBars(length - 1 | 0)
          ];
  }
}

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 50;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var myList = Belt_List.shuffle(getValueBars(listLength));
  return React.createElement("div", undefined, React.createElement("p", undefined, "Hello!"), React.createElement("p", undefined, String(listLength)), React.createElement("h1", undefined, "Controls"), React.createElement("p", undefined, "Length of list to sort:"), React.createElement("input", {
                  type: "range",
                  value: String(listLength),
                  onChange: (function ($$event) {
                      var myVal = $$event.target.value;
                      return Curry._1(setListLength, (function (listLength) {
                                    return myVal;
                                  }));
                    })
                }), React.createElement("div", undefined, React.createElement("h2", undefined, "Bubble Sort:"), React.createElement("div", {
                      className: algoContainer
                    }, $$Array.of_list(myList))));
}

var make = SortingAlgorithms;

exports.Styles = Styles;
exports.valueBar = valueBar;
exports.getValueBars = getValueBars;
exports.make = make;
/* card Not a pure module */
