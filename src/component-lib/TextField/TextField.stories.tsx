import React from "react";
import TextField from "./TextField";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "TextField",
  component: TextField,
  decorators: [withKnobs]
};

export const NormalText = () => (
  <TextField
    onChange={action("Changed")}
    label={text("Message", "Hello World")}
  />
);
