import * as fsa from '@sha/fsa/'
import {EMPTY_VALUE} from '@sha/react-fp/'
import {BillingAddressVO} from './valueObjects'
import {always, compose, forEach, isEmpty, prop, values, map, T} from 'ramda'
import {ExtractActionByFactory, TypedReducer} from '../helpers'

export type KeyedMap<V, T> = {
    [P in keyof T]: V
}

export type ErrorMap<D> = Partial<KeyedMap<string[], D>>

export type TouchMap<D> = Partial<KeyedMap<boolean, D>>

export type Validator<D> = (value: D) => ErrorMap<D>

export type FormState<D> = {
    value: D
    originalValue?: D
    errors: ErrorMap<D>
    touched: TouchMap<D>
}


export const createFormDuck = <D extends object>(name: string, validator: Validator<D>, value: D) => {
    const facroty = fsa.actionCreatorFactory(name)

    type Key = keyof D
    type ChangePayload<K extends keyof D> = { property: Key, value: D[Key] }
    const act = {
        reset: facroty<Partial<BillingAddressVO>>('reset'),
        changeProperty: facroty<{ property: string, value: any }>('change'),
        touchAll: facroty('touchAll'),
    }

    const defaultValue = value
    const defaultState = {
        value,
        errors: EMPTY_VALUE,
        touched: EMPTY_VALUE,
    }

    const reducer = fsa.reducerWithInitialState(defaultState)
        .case(act.reset, always(defaultState))
        .case(act.changeProperty, (state, {property, value}) => ({
            value: {...state.value, [property]: value},
            errors: validator({...defaultValue, ...state.value, [property]: value}),
            touched: {...state.touched, [property]: true}
        }))
        .case(act.touchAll, state => ({
            ...state,
            errors: validator({...defaultValue, ...state.value}),
            touched: map(T, defaultValue),
        }))

    type ActionType = ExtractActionByFactory<typeof act>

    return {
        sel: {
            isValid: compose(forEach(isEmpty), values, prop<'errors', FormState<D>>('errors'))
        },
        name,
        act,
        reducer: reducer as any as TypedReducer<FormState<D>>,
        defaultState: defaultState as FormState<D>,
    }
}


