import {curry} from 'ramda'
import GenericFunction from './GenericFunction'
import GenericReturnType from './GenericReturnType'

type C = typeof curry

type Curry<F extends Function> =
    F extends GenericFunction<infer R, infer T1, infer T2>
        ? GenericReturnType<C, <T1, T2, TResult extends T2>(