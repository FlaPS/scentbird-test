import {F} from './lazyCompose'

export function bind<I>(value: I): <O>(f: F<O, I>) => O


export function bind<O2, I2>(value: F<O2, I2>): <O>(f: F<O, F<O2, I2>>) => O

export function bind (value) {

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

