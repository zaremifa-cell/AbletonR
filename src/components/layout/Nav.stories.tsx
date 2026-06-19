import type { Meta, StoryObj } from "@storybook/react";
import Nav from "./Nav";
import { CartProvider } from "@/contexts/CartContext";

const meta = {
  title: "Layout/Nav",
  component: Nav,
  decorators: [
    (Story, context) => (
      <CartProvider initialItems={context.parameters.cartItems ?? []}>
        <Story />
      </CartProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activePack: null,
  },
  parameters: {
    cartItems: [{ slug: "live-12", quantity: 2 }],
  },
};

export const PacksHoverState: Story = {
  args: {
    activePack: { title: "Tape", slug: "tape" },
  },
  parameters: {
    cartItems: [],
  },
};
