import { Branded } from "."

const orderId = class OrderId extends Branded<string, "my-package.OrderId">() {}

export type OrderId = typeof orderId.prototype

export function safeCreateOrderId() {
  return orderId.brand("x")
}
