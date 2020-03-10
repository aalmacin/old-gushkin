import React from "react";
import ExpiredMessage from "./ExpiredMessage";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { BrowserRouter } from "react-router-dom";


export default {
  title: "ExpiredMessage",
  component: ExpiredMessage,
  decorators: [withKnobs]
};

export const Text = () => <BrowserRouter><ExpiredMessage isExpired={boolean('Is Expired', true)} /></BrowserRouter>;