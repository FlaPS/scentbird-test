import {bool} from 'prop-types'

let cast = <T> (value: any = {}) => value as any as T
 export default cast





let foo = <T>(value: T ) =>
    ({value})

foo = console
let bindGen = <T>() =>
     (value: T) => ({
         value
     })

bindGen = console.log

const fooT = bindGen<boolean>()

type N = ReturnType<typeof foo<boolean>>

const a = cast<N>()
a.value = 'l'
