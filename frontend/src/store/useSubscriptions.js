import { useContext } from "react";
import { SubscriptionContext } from "./SubscriptionContext.js";

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscriptions måste användas inuti <SubscriptionProvider>.",
    );
  }

  return context;
}
