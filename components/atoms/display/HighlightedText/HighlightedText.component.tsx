import React from "react";
import { Text, TextStyle } from "react-native";

export type HighlightTextProps = {
  search: string;
  textStyle?: TextStyle;
  children?: React.ReactNode | React.ReactNode[];
  boldTextStyles: TextStyle;
  lightTextStyles: TextStyle;
};

export const HighlightedText = (props: HighlightTextProps) => {
  const {
    search = "",
    children = "",
    textStyle = {},
    boldTextStyles = {
      fontWeight: "bold",
    },
    lightTextStyles = {},
  } = props;

  const escapeRegExp = (str = "") =>
    str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  const patt = new RegExp(`(${escapeRegExp(search)})`, "i");
  const parts = String(children).split(patt);

  if (search) {
    return (
      <Text style={textStyle}>
        {parts.map((part, index) =>
          patt.test(part) ? (
            <Text style={[textStyle, boldTextStyles]} key={index}>
              {part}
            </Text>
          ) : (
            <Text style={[textStyle, lightTextStyles]} key={index}>
              {part}
            </Text>
          ),
        )}
      </Text>
    );
  } else {
    return <Text style={textStyle}>{children}</Text>;
  }
};
