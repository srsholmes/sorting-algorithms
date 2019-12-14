'use strict';

var Css = require("bs-css/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function fill(element, length) {
  if (length <= 0) {
    return /* [] */0;
  } else {
    return /* :: */[
            element,
            fill(element, length - 1 | 0)
          ];
  }
}

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
  actionButton: actionButton
};

function bob(param) {
  return React.createElement("div", {
              className: "value"
            }, "Hello");
}

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 15;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var myList = fill(bob(/* () */0), listLength);
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
                      className: "algoContainer"
                    }, $$Array.of_list(myList))), React.createElement("div", {
                  className: card
                }, React.createElement("h1", {
                      className: title
                    }, "Hello"), React.createElement("button", {
                      className: actionButton(false)
                    })));
}

var make = SortingAlgorithms;

exports.fill = fill;
exports.Styles = Styles;
exports.bob = bob;
exports.make = make;
/* card Not a pure module */
