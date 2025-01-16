import type { Meta, StoryObj } from "@storybook/react";

import { HighlightedText, HighlightTextProps } from "./HighlightedText.component";

const meta: Meta<typeof HighlightedText> = {
  title: "atoms/display/HighlightText",
  component: HighlightedText,
} as Meta<typeof HighlightedText>;

export default meta;

export const Basic: StoryObj<HighlightTextProps> = {
  args: {
    search: "of search",
    children: "This is result of search",
  },
};
