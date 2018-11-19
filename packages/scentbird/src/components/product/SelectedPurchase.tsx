import React from 'react'
import styled from 'styled-components'
import {PurchaseOptionVO} from '../../store/scentbird/valueObjects'
import {DivProps} from '@sha/react-fp'
import {ProductPicture} from '../elements'


type SelectedSubscriptionProps = {
    value: PurchaseOptionVO
} & DivProps

const SelectedPurchaseRaw = ({value, ref, ...props}: SelectedSubscriptionProps) =>
    <div {...props}>
        <ProductPicture url={value.url} size={50} inlineBlock/>
        <div className='info'>
            <div>Subscribtion price: <b>${value.price.toFixed(2)}</b></div>
            <div>Size: <b>{value.size} Oz</b></div>
        </div>
    </div>

export const SelectedPurchase = styled(SelectedPurchaseRaw)`
  width: 240px;
  font-size: 16px;
  display: flex;
  > .info {
  
  }
`
