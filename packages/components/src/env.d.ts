/// <reference types="vite/client" />
type Primitive = string | boolean | number;

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>;
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
