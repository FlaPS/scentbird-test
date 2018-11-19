import React from 'react'
import {storiesOf} from '@storybook/react'
import {StringInput} from '../inputs/StringInput'
import {AddressForm} from './AddressForm'
import {createFormDuck} from '../../store/scentbird/createFormDuck'
import {BillingAddressVO, defaultAddressVO} from '../../store/scentbird/valueObjects'
import {validateAddress} from '../../store/scentbird/addressValidator'
import {trace} from '@sha/utils'
import {compose} from 'redux'
import createInfoDuck from '../../store/scentbird/createInfoDuck'
import InfoView from './InfoView'

const addressReducer = createFormDuck<BillingAddressVO>('address', validateAddress, defaultAddressVO)
const tapInfo = trace('Address action', 'info')
const AddressEditWithReducer = () => {
    const [state, dispatch] = React.useReducer(addressReducer.reducer, {
        value: defaultAddressVO,
        errors: {},
        touched: {},
    })
    const tapDispatch = trace('Address action', 'log', dispatch)
    console.log(state)

    return <AddressForm
        state={state}
        onPropertyChange={compose(tapDispatch, addressReducer.act.changeProperty)
        }
    />
}


const infoDuck = createInfoDuck('info')

const InfoViewWithReducer = () => {
    const [state, dispatchRaw] = React.useReducer(infoDuck.reducer, infoDuck.defaultState)
    const dispatch = tapInfo(dispatchRaw)
    console.log(state)

    return <InfoView
        dispatch={dispatch}
        state={state}
        act={infoDuck.act}
    />
}

storiesOf('shipping', module)
    .add('StringInput optional', () =>
        <StringInput optional label={'Mobile number'} value={'abra'} onValue={console.log}/>,
    )
    .add('StringInput required', () =>
        <StringInput label={'Mobile number'} onValue={console.log}/>,
    )
    .add('StringInput required with pattern', () =>
        <StringInput label={'Mobile number'} value={'abra'} onValue={console.log}/>,
    )
    .add('StringInput optional with pattern', () =>
        <StringInput optional label={'Mobile number'} value={'abra'} onValue={console.log}/>,
    )
    .add('Adress edit view', () =>
        <AddressForm state={{}}/>,
    )
    .add('Adress edit with reducer', () =>
        <AddressEditWithReducer/>,
    )
    .add('Info view edit with reducer', () =>
        <InfoViewWithReducer/>,
    )
