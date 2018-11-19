import {productMock} from './mocks'
import {combineReducers, Reducer} from 'redux'
import {infoDuck} from './createInfoDuck'
import saga from './saga'

const defaultProducts = [
    productMock,
]

const reducer = combineReducers({
    products: (state, action) => defaultProducts,
    info: infoDuck.reducer as Reducer<typeof infoDuck.defaultState>,
})

const act = infoDuck.act

export {saga, infoDuck, reducer, act}
































