'use strict';

var Css = require("bs-css/src/Css.js");

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
                Css.backgroundColor(Css.blue),
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

exports.Styles = Styles;
/* title Not a pure module */
