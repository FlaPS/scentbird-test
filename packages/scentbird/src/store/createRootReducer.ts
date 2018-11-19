import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import * as scentbird from './scentbird'

type DeepReadonly<T> = T extends any[]
    ? DeepReadonlyArray<T[number]>
    : T extends object ? DeepReadonlyObject<T> : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {
}

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
}

const reducer = (history: History) => combineReducers({
    router: connectRouter(history),
    app: scentbird.reducer,
})

export type FrontState = ReturnType<ReturnType<typeof reducer>>

export default reducer
