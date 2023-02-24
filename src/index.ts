export type Branded<T, Brand> = {
  new (): {
    "  value": any
    "  kind": Brand
  }
  brand<Cls extends Branded<T, Brand>>(this: Cls, t: T): InstanceType<Cls>
  unbrand<Cls extends Branded<T, Brand>>(this: Cls, b: InstanceType<Cls>): T
}

export function Branded<T, Brand>() {
  return class Type {
    constructor() {
      throw new TypeError("Cannot instantiate branded types")
    }
    "  value": Type
    "  kind": Brand
    static brand<Cls extends typeof Type>(this: Cls, t: T) {
      return t as any as InstanceType<Cls>
    }
    static unbrand<Cls extends typeof Type>(this: Cls, b: InstanceType<Cls>) {
      return b as any as T
    }
    static Type: Type
  } as Branded<T, Brand>
}
