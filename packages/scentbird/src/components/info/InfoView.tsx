import React from 'react'
import {Dispatch} from '@sha/fsa'
import {ExtractProps} from '@sha/react-fp'
import {styled} from '../../styles/styled'
import {BillingAddressVO, ShippingAddressVO} from '../../store/scentbird/valueObjects'
import {AddressForm} from './AddressForm'
import {createInfoDuck} from '../../store/scentbird/createInfoDuck'
import {compose} from 'redux'
import {FormState} from '../inputs/Input'
import {StringInput} from '../inputs/StringInput'
import {pathOr} from 'ramda'
import {media} from '../../styles/media'
import {CheckBox} from '../inputs/CheckBoxInput'
import {AddonButton, BackLink} from '../elements'
import SVGLibrary from '../../styles/SVGLibrary'
import {PageLayout} from '../PageLayout'

export const InfoView = ({dispatch, state, act, ...props}: ShippingViewProps) => {

   return  <Layout {...props}>
                <AddressForm
                    title="Shipping address"
                    state={state.shipping}
                    hasPhone
                    onPropertyChange={(e) => {compose(dispatch, act.shipping, act.form.changeProperty)(e)}}
                />
                <CheckBox
                    label='Use this address as my billing address'
                    value={state.useSame}
                    onValue={compose(dispatch, act.useSame)}
                />

                <div className='addition'>
                    <StringInput
                        value={pathOr('', ['shipping', 'value', 'phone'], state)}
                        onValue={value => {
                            compose(dispatch, act.shipping, act.form.changeProperty)({property: 'phone', value})
                        }}
                        label='Mobile number'
                        optional
                    />
                    <div className='remark'>
                        <span>We may send you special discounts and offers</span>
                    </div>
                </div>
                {!state.useSame &&
                <AddressForm
                    title="Billing address"
                    state={state.billing}
                    onPropertyChange={compose(dispatch, act.billing, act.form.changeProperty)}
                />
                }
                <div className="actions">
                    <BackLink/>
                    <AddonButton 
                        addon={SVGLibrary.ForwardIcon} 
                        onClick={() => dispatch(act.submit(undefined))}
                    >
                        BUY NOW
                    </AddonButton>
                </div>
            </Layout>
}

export default InfoView


type ShippingViewProps = {
    dispatch: Dispatch
    act: ReturnType<typeof createInfoDuck>['act']
    state: {
        billing: FormState<BillingAddressVO>
        shipping: FormState<ShippingAddressVO>
        useSame: boolean
    }
} & ExtractProps<typeof Layout>


const Layout = styled(PageLayout)`

    max-width: 701px;

    > * {
        margin-bottom: 20px

    }



    > .addition {
        width: 100%;
        justify-content: space-between;
        display: flex;
        > .remark {
            ${media.landscapeMin`
                display: block;
            `}
            display: none;
            margin-left: 20px;
            width: 100%;
            line-height: 50px;
        }
    }



    > .actions {

        width: 370px;
        display: flex;
        float: right;
        ${media.phone`
            width: 100%;
            flex-direction: column-reverse;
            > :first-child{
                margin-top: 20px;
            }
        `}
    }
`



