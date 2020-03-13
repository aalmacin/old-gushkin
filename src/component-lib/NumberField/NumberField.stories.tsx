import React from "react";
import NumberField from "./NumberField";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "NumberField",
  component: NumberField,
  decorators: [withKnobs]
};

export const NormalText = () => (
  <NumberField
    onChange={action("Changed")}
    label={text("Message", "Hello World")}
  />
);
