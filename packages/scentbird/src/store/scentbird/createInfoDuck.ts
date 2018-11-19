import * as fsa from '@sha/fsa'
import {defaultAddressVO} from './valueObjects'
import {createFormDuck} from './createFormDuck'
import {validateAddress} from './addressValidator'
import {combineReducers} from 'redux'
import {Simulate} from 'react-dom/test-utils'
import {ExtractAction, ExtractActionByFactory, ExtractState, TypedReducer} from '../helpers'


export const createInfoDuck = (name: string = 'info') => {
    const shipping = createFormDuck('form', validateAddress, defaultAddressVO)
    const billing = createFormDuck('form', validateAddress, defaultAddressVO)
    const factory = fsa.actionCreatorFactory(name)
    const act = {
        shipping: factory<ExtractActionByFactory<typeof shipping['act']>>('shipping'),
        billing: factory<ExtractActionByFactory<typeof billing['act']>>('billing'),
        useSame: factory<boolean>('useSame'),
        submit: factory<undefined>('submit'),
        form: shipping.act,
    }


    const defaultState = {
        shipping: shipping.defaultState,
        billing: billing.defaultState,
        useSame: true,
    }

    const reducer = fsa.reducerWithInitialState(defaultState)
    // Copy shipping address into billing address,
    // in case of user decided use different addresses
        .case(act.useSame, (state, useSame) => ({
                ...state,
                useSame,
                billing: useSame ? billing.defaultState : state.shipping,
            }),
        )
        .case(act.shipping, (state, payload) => ({...state, shipping: shipping.reducer(state.shipping, payload)}))
        .case(act.billing, (state, payload) => ({...state, billing: billing.reducer(state.billing, payload)}))
    return {
        reducer: reducer as any as TypedReducer<typeof defaultState, any>,
        act,
        defaultState,
    }

}

export default createInfoDuck
export type InfoState = ExtractState<typeof createInfoDuck> & { useSame: boolean }
export type InfoStateAction = ExtractAction<typeof createInfoDuck>
export const infoDuck = createInfoDuck()
