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

  let value = length =>
    style([
      height(px(length)),
      backgroundColor(blue),
      display(flexBox),
      flexDirection(row),
      alignItems(stretch),
      width(px(5)),
    ]);

  let sortButton =
    style([color(black), borderRadius(px(3)), marginTop(px(20))]);
};
