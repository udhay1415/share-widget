import React from 'react';
import { storiesOf } from "@storybook/react";
import ShareWidget from './shareWidget';

export default {
  title: "Components/ShareWidget"
}

export const Default = (args) => <ShareWidget {...args}></ShareWidget>

Default.args = {
  title: "Share",
  headerTitle: "Share to web",
  headerDescription: "Publish and share link with anyone",
  bodyTitle: "Everyone at OSlash",
  bodyDescription: "25 workspace members",
  buttonBg: "#111827",
  buttonTextColor: "#fff"
}