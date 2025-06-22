// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.

import RevenueCard from "../../components/RevenueCard";

const meta = {
  component: RevenueCard,
};

export default meta;

export const BigAmount = {
  args: {
    orderCount: "1234",
    title: "asdf",
    amount: "1000000000"
  },
};
export const SmallAmount = {
  args: {
    orderCount: "1234",
    title: "asdf",
    amount: "9234"
  },
};