import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "./Nav";
import { CartProvider } from "@/contexts/CartContext";

const meta = {
  title: "Layout/Nav",
  component: Nav,
  decorators: [
    (Story, context) => (
      <MemoryRouter>
        <CartProvider initialItems={context.parameters.cartItems ?? []}>
          <Story />
        </CartProvider>
      </MemoryRouter>
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
