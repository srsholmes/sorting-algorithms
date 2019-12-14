'use strict';

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

function bob(param) {
  return React.createElement("div", {
              className: "value"
            }, "Hello");
}

function SortingAlgorithms(Props) {
  var match = React.useState((function () {
          return 0;
        }));
  var setListLength = match[1];
  var listLength = match[0];
  var myList = fill(bob(/* () */0), listLength);
  return React.createElement("div", undefined, React.createElement("div", undefined, React.createElement("p", undefined, "Hello!"), React.createElement("p", undefined, "World!"), React.createElement("p", undefined, String(listLength)), React.createElement("input", {
                      type: "range",
                      value: String(listLength),
                      onChange: (function ($$event) {
                          var myVal = $$event.target.value;
                          return Curry._1(setListLength, (function (listLength) {
                                        return myVal;
                                      }));
                        })
                    }), React.createElement("div", {
                      className: "algoContainer"
                    }, $$Array.of_list(myList))));
}

var make = SortingAlgorithms;

exports.fill = fill;
exports.bob = bob;
exports.make = make;
/* react Not a pure module */
