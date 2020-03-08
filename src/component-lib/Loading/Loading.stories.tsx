import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import Loading from "./Loading";

export default {
  title: "Loading",
  component: Loading,
  decorators: [withKnobs]
};

export const Default = () => <Loading isLoading={boolean('Is Loading', true)} />;