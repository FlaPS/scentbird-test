const foo = <T>(x: T){
    return {
        value: x,
    }
}

type GenericFunction0 = <R>() => R
type GenericFunction1<R, G1> = <R, G1>(arg1: G1) => R
type GenericFunction2<R, G1, G2> = (arg1: G1, arg2: G2) => R
type GenericFunction3<R, G1, G2, G3> = (arg1: G1, arg2: G2, arg3: G3, ) => R


export type GenericReturnType0<F, G1> =
    F extends GenericFunction0<infer R> ? R : never
export type GenericReturnType1<F, G1> =
    F extends (value: G1) => infer R ? R : never


type N = GenericReturnType1<typeof >foo>

const n: N = {} as any as N
n.value = true
