export type Constructor<T> =
  { new(...args: any[]): T } | { readonly _Class: T }

/**
 * Lightweight encoding for higher kinded types.
 *
 * Inspired by the
 * [Lightweight higher-kinded polymorphism]{@link https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf}
 * paper.
 *
 * Built to be compatible with other projects in the ecosystem.
 */
export interface HK<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/**
 * Lightweight encoding for higher kinded types, the version for data
 * types with two type parameters.
 *
 * See {@link HK} and {@link HK3}.
 */
export interface HK2<URI, L, A> extends HK<URI, A> {
  readonly _L: L
}

/**
 * Lightweight encoding for higher kinded types, the version for data
 * types with two type parameters.
 *
 * See {@link HK} and {@link HK2}.
 */
export interface HK3<URI, U, L, A> extends HK2<URI, L, A> {
  readonly _U: U
}
