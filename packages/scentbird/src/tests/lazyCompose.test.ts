import {default as compose, fold} from './lazyCompose'

const toUpper = (value: string) => value.toUpperCase()// function with no name, like a anonious callback in React
const getLength = (value: string) => value.length
const mult7 = (value: number) => value * 7
const asString = (value: any) => String(value)
const toBoolean = (value: any) => Boolean(value)


describe('Compostion creation', () => {
    beforeAll(() => {
        compose.compositionsByHash.clear()
        compose.functions.clear()
    })
    test('Compose 1 function', () => {
            const f = compose(toUpper)
            expect(compose.compositionsByHash.size).toEqual(0)
            expect(compose.functions.size).toEqual(0)
        },
    )
    let toUpperAsString
    test('Compose 2 function', () => {
            toUpperAsString = compose(toUpper, asString)
            expect(compose.compositionsByHash.size).toEqual(1)
            expect(compose.functions.size).toEqual(2)
        },
    )
    let toBooleanToUpperAsString
    test('Compose 1  function ad one composition', () => {
            toBooleanToUpperAsString = compose(toBoolean, toUpperAsString)
            expect(compose.compositionsByHash.size).toEqual(2)
            expect(compose.functions.size).toEqual(3)
        },
    )
    test('Compose 1 function (which already was registered) and 2 composes', () => {
        const result = compose(toBoolean, toUpperAsString, toBooleanToUpperAsString)
        expect(compose.compositionsByHash.size).toEqual(4)
        expect(compose.functions.size).toEqual(3)

    })

    test('toUpperAsString test, fold point free test', () => {
        const result = fold(compose(toUpper, asString), 'd')
        expect(result).toEqual('D')
    })
    test('toUpperAsString test, call fold as member of the composition test', () => {
        const result = compose(toUpper, asString).fold('d')
        expect(result).toEqual('D')
    })
    test('Mass test', () => {

        const asStringToBoolean = compose(toBoolean, toUpper, asString)
        console.log('asStringToBoolean hash', asStringToBoolean.hash)
        const bool = asStringToBoolean('dd') // bool is boolean - ok

        expect(bool).toEqual(true)
        const asStringToUpper = compose(toUpper, asString)
        console.log('complex example', compose(Boolean, asStringToUpper) === asStringToBoolean)

        const b1 = compose(getLength, toUpper)
        const c1 = compose(getLength, toUpper)
        expect(b1 === c1).toBeTruthy()

        const c2 = compose(asString, mult7)
        const c3 = compose(c1, c2)
        const c4 = compose(Boolean, c3)

        const a1 = compose(toUpper, asString)
        const a2 = compose(getLength, a1)
        const a3 = compose(a2, mult7)
        const a4 = compose(Boolean, a3)


        expect(a1('a')).toEqual('A')
        console.log('c3 hash', c3.hash)
        console.log('a3 hash', a3.hash)

        const resultC = c4(99)
        expect(resultC).toEqual(true)
        expect(typeof resultC).toEqual('boolean')

        const resultA = a3(315)
        expect(typeof resultA).toEqual('number')

        expect(c3 === a3).toBeTruthy() // equals , ok
        // @ts-ignore
        expect(c4 === a3).toBeFalsy() // TS error - different types inferred
        expect(c4 === a4).toBeTruthy() // equals , ok
    })
})
