import { Branded } from ".";

namespace my {
  export class OrderId extends Branded<string, 'mypkgname.OrderId'>() {}
}

export function safeCreateId() {
  return my.OrderId.brand('x')
}

export type OrderId = my.OrderId;
