import { Branded } from "."

const orderId = class extends Branded<string, "my-package.OrderId">() {}
export type OrderId = InstanceType<typeof orderId>

export function safeCreateOrderId() {
  return orderId.brand("x")
}
