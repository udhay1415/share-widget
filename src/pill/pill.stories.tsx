import React from 'react';
import { storiesOf } from "@storybook/react";
import Pill from './Pill';

export default {
  title: "Components/Pill"
}

export const Default = (args) => <Pill {...args}></Pill>

Default.args = {
  title: "Product",
  bgColor: "#E5E7EB",
  textColor: "#111827"
}