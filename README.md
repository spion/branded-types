## branded-types

Flippin' great branded types for TypeScript!

Use them like opaque types in Flow, except you get to control visibility.

Highlights:

- primitives can be branded without any runtime effects (no wrappers or other overhead)
- nice type names in error messages

## Simple example

Define a branded type:

```typescript
import { Branded } from "branded-types"
export class OrderId extends Branded<string, "my-package.OrderId">() {}
```

Import and use it

```typescript
import { OrderId } from "./other-module"

OrderId.brand("someUuid") === "someString" // error
```

## Advanced example

Want to hide the branding and un-branding functions? Here is an easy way to do it.

- Put the class in a private `const`. Make sure you still name it with the desired name, as
  it will be used for error messages.
- Use the `brand` method within your module to safely create instances
- Export only the type instead of the entire class

```typescript
import { Branded } from "branded-types"

const orderId = class OrderId extends Branded<string, "my-package.OrderId">() {}

export function safeCreateOrderId() {
  return orderId.brand("x")
}

export type OrderId = typeof orderId.prototype
```

Other modules can only use the safe ID creation functions now, as `OrderId` is just a type:

```typescript
import { safeCreateOrderId, OrderId } from "./other-module"

safeCreateOrderId() == "someString" // error

let m: Map<OrderId, string> = new Map()

m.set(safeCreateOrderId(), "1")
m.set("someString", "2") // error
```

## Features

- Not nominal. The same package in different places in the filesystem will still be compatible with
  other instances (unless you bump the brand name - you control version compatibility)
- Nice error messages e.g. the equality comparison error looks like this:
  ```
  This condition will always return 'false' since
  the types 'string' and 'OrderId' have no overlap.
  ```
  and the incorrect map insertion above produces the error:
  ```
  Argument of type 'string' is not assignable to parameter of type 'OrderId'.
  ```
- No runtime overhead. Despite all the class machinery, the converted values have NO runtime
  representation. The conversion functions do nothing except return the same value. The machinery
  is there for the nice errors and API only.
- No built in string / number operators allowed. If for example you try to concat two OrderIds
  with `+`, its not going to work. You have to use an explicit cast to the source type via e.g.
  `String(brandedVal)` or `Number(brandedVal)` etc, then perform the operation
