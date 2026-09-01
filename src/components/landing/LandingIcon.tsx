import {
  Check,
  Clock3,
  CreditCard,
  Globe2,
  Info,
  Plane,
  RefreshCw,
  Send,
  ShoppingBag,
  Smartphone,
  Store,
  WalletCards,
  type LucideProps,
} from "lucide-react";

import type { IconName } from "@/content/types";

const icons = {
  card: CreditCard,
  check: Check,
  clock: Clock3,
  globe: Globe2,
  info: Info,
  plane: Plane,
  refresh: RefreshCw,
  send: Send,
  "shopping-bag": ShoppingBag,
  smartphone: Smartphone,
  store: Store,
  wallet: WalletCards,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

interface LandingIconProps extends Omit<LucideProps, "name"> {
  name: IconName;
}

export function LandingIcon({ name, ...props }: LandingIconProps) {
  const Icon = icons[name];

  return <Icon aria-hidden="true" focusable="false" {...props} />;
}
