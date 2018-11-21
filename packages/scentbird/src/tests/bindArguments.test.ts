import {compose, F, fold} from './lazyCompose'

const toUpper = (value: string) => value.toUpperCase()// function with no name, like a anonious callback in React
const getLength = (value: string) => value.length
const mult7 = (value: number) => value * 7
const asString = (value: any) => String(value)
const toBoolean = (value: any) => Boolean(value)



function bind<I>(value: I): <O>(f: F<O, I>) => O


function bind<O2, I2>(value: F<O2, I2>): <O>(f: F<O, F<O2, I2>>) => O

function bind (value) {
    return f  => {
        /*const box = {value, f}
        const binded = new Function(
            'return function ' + name + '(){ return this.f(this.value)}',
                )()
        */
        // const result = f(value)
        return (f ? f(value) : () => undefined )
    }
}




describe('Bind arguments test', () => {
    beforeEach(() => {
        compose.compositionsByHash.clear()
        compose.functions.clear()
    })


    const add = (a: number) => (b: number) => a + b

    const mult = (a: number) => (b: number) => a * b

    const callOther = <I, O>(f: F<O, I>) => (value: I) => f(value)

    test('Mult 7', () =>  {
        const add5 = bind(5)(add)
        const mult2 = bind(2)(mult)

        expect(mult2(4)).toEqual(8)
        const complex = compose(add5, mult2)

        expect(complex(1)).toEqual(7)


        type User<T> = {
            name: T
        }

        const up = bind((u: User<boolean>[]) => u[0].name)
        (callOther)


        console.log(up([{name: true}]))
    })

})
