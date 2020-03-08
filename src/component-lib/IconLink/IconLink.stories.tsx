import React from "react";
import { action } from "@storybook/addon-actions";
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { withKnobs } from "@storybook/addon-knobs";
import IconLink from "./IconLink";


export default {
  title: "Icon Link",
  component: IconLink,
  decorators: [withKnobs]
};

export const Default = () => <IconLink onClick={action('Clicked icon link')} to="#" icon={faHandHoldingHeart} isExternal> Hello Icon Link</IconLink >;