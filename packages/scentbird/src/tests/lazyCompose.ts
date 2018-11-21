const log = (...args: any[]) => undefined as any

export type F<R, T = any> = (value: T) => R

type Part<O, I> = F<O, I> | Composition<O, I>

type Composition<O, I = never> = {
    tail: Part<O, any>
    head: Part<any, I>
    fold: F<O, I>

    hash: string
} & F<O, I>

const identity = <T>(value: T) => value

type Identity = typeof identity

function compose<R, T1>(
    p1: Part<R, T1>,
): Part<R, T1>

function compose<R, T1, T2>(
    p1: Part<R, T1>,
    p2: Part<T1, T2>,
): Composition<R, T2>
function compose<R, T1, T2, T3>(
    p1: Part<R, T1>,
    p2: Part<T1, T2>,
    p3: Part<T2, T3>,
): Composition<R, T3>
function compose<R, T1, T2, T3, T4>(
    p1: Part<R, T1>,
    p2: Part<T1, T2>,
    p3: Part<T2, T3>,
    p4: Part<T3, T4>,
): Composition<R, T4>
function compose<R, T1, T2, T3, T4>(
    p1: Part<R, T1>,
    p2: Part<T1, T2>,
    p3: Part<T2, T3>,
    p4: Part<T3, T4>,
): Composition<R, T4>
function compose<R, T1, T2, T3, T4, T5>(
    p1: Part<R, T1>,
    p2: Part<T1, T2>,
    p3: Part<T2, T3>,
    p4: Part<T3, T4>,
    p5: Part<T4, T5>,
): Composition<R, T5>

function compose(...args: Part<any, any>[]) {
    const length = args.length
    if (length === 0)
        return identity
    if (length === 1)
        return args[0]
    if (length === 2)
        return composeCache(args[0], args[1])

    // copy all the parts to not mutate one,
    // args could be passed via apply method

    let result = compose(args[args.length - 2], args[args.length - 1])

    for (let i = args.length - 3; i >= 0; i--) {

        // @ts-ignore
        result = compose(args[i], result)
    }

    return result

}


/**
 * const compose = <O, I>(tail: Part<O, any>, head: Part<any, I>) =>
 * composeCache(tail, head) as any as  Composition<O, I>
 */
// TODO: think about generic function inference
/*

type Compose = <A, B>(a: A, b: B) =>
    A extends Composition<infer AO, infer AI>
        ? B extends Composition<infer BO, infer BI>
            ? Composition<AO, BI>
            : B extends F<infer BO, infer BI>
                ? Composition<AO, BI>
                : Composition<AO, any>
        : A extends F<infer AO, infer AI>
            ? B extends Composition<infer BO, infer BI>
                ? Composition<AO, BI>
                : B extends F<infer BO, infer BI>
                    ? Composition<AO, BI>
                    : Composition<AO, any>
            : Composition<any, any>
*/
type Hash = string

const functions = new Map<Function, Hash>()
const compositionsByHash = new Map<string, Composition<any, any>>()

const composeCache = (() => {

        let counter = 0


        const generateFunctionHash = (f: Function): Hash => {
            if (f.name)
                return f.name + (counter++)

            const hash = 'f' + (counter++)
            console.warn(`Function has no name, this could be a cause of cache memory leaks.
                            Registered hash = ${hash} . Body `, f)
            return hash
        }

        const getFunctionHash = (f: Function): Hash => {
            if (functions.has(f))
                return functions.get(f)!

            const hash = generateFunctionHash(f)
            functions.set(f, hash)
            return hash
        }

        // Recusively calcalate hash based on function name
        const getHash = (tail: Composition<any, any> | F<any, any>, head: Composition<any, any> | F<any, any>) => {
            const tailHash = isComposition(tail)
                ? tail.hash
                : getFunctionHash(tail)
            const headHash = isComposition(head)
                ? head.hash
                : getFunctionHash(head)

            return tailHash + ' <- ' + headHash
        }


        return (tail, head) => {
            const hash = getHash(tail, head)
            log('found hash', hash)
            let box = compositionsByHash.get(hash)
            if (!box) {
                log('create new Composition', hash)
                const obj = {
                    [hash]: value => fold(box!, value),
                }

                box = Object.assign({head, hash, tail, fold: foldInComposition})

                box = Object.assign(foldInComposition.bind(box), box )
                compositionsByHash.set(hash, box!)
            }
            return box
        }
    }

)()


const isComposition = <O, I>(value: F<O, I> | Composition<O, I>): value is Composition<O, I> =>
    value['head'] || value['tail']

function foldInComposition(value) {
    // @ts-ignore
    log('calling fold in composition', this, value)
    // @ts-ignore
    return fold(this, value)
}

function fold<O, I>(composition: Composition<O, I> | F<O, I>, value: I): O {
    let result: any = value
    let pointer: Composition<O, I> | F<O, I> | undefined = composition
    while (pointer) {
        if (isComposition(pointer)) {
            result = fold(pointer.head, result)
            pointer = pointer.tail
        } else {
            log('Call', pointer)
            log('with arg', result)
            log('Pointer name', pointer.name)
            result = pointer(result)
            log('Pointer result', result)
            pointer = undefined
        }
    }

    return result as O
}


const api = Object.assign(compose, {compositionsByHash, functions})

export {fold, api as compose}
export default api
