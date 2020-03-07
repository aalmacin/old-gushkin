import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default {
  title: "Button",
  component: Button
};

export const Text = () => <Button>Hello Button</Button>;

export const WithIcon = () => (
  <Button icon={faCoffee}>
    With Icons
  </Button>
);
