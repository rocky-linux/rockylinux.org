import { action } from "@storybook/addon-actions";
import Button from "../Button";

import type { Meta, StoryContext, StoryObj } from "@storybook/react";

const logAction =
  (name: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    action(name)(event.type);
  };

const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: [],
  argTypes: {},
  args: {
    onClick: logAction("onClick"),
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story["render"] = args => <Button {...args} />;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click Me!",
  },
  render: Template,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Click Me!",
  },
  render: Template,
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Click Me!",
  },
  render: Template,
};

export const PrimarySecondary: Story = {
  render: () => (
    <div className="flex gap-x-4">
      <div>{Template(Primary.args || {}, Primary as StoryContext)}</div>
      <div>{Template(Secondary.args || {}, Secondary as StoryContext)}</div>
    </div>
  ),
};

export const PrimarySecondaryTertiary: Story = {
  render: () => (
    <div className="flex gap-x-4">
      <div>{Template(Primary.args || {}, Primary as StoryContext)}</div>
      <div>{Template(Secondary.args || {}, Secondary as StoryContext)}</div>
      <div>{Template(Tertiary.args || {}, Tertiary as StoryContext)}</div>
    </div>
  ),
};
