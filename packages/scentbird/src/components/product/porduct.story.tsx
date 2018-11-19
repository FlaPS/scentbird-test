import {Rating} from './Rating'
import {ProductTitle} from './ProductTitle'
import {productMock} from '../../store/scentbird/mocks'
import {SelectedPurchase} from './SelectedPurchase'
import {Collapsable} from './Collapsable'
import {Tab, TabNavigator} from './TabNavigator'
import {PurchaseOptionList} from './PurchaseOptionList'
import {ProductCard} from './ProductCard'
import React from 'react'
import {storiesOf} from '@storybook/react'
import {ProductView} from './ProductView'

storiesOf('product', module)
    .add('RatingBar empty', () =>
        <Rating quantOfReviews={0} value={0}/>,
    )
    .add('RatingBar 0.7', () =>
        <Rating quantOfReviews={19} value={0.67}/>,
    )
    .add('Product Title', () =>
        <ProductTitle {...productMock}/>,
    )
    .add('Product with product prop', () =>
        <ProductTitle product={productMock}/>,
    )
    .add('SelectedSubscription', () =>
        <SelectedPurchase value={productMock.purchaseOptions[0]}/>,
    )
    .add('Collapsabpe', () =>
        <Collapsable>{productMock.description}</Collapsable>
    )
    .add('TabNavigator', () =>
        <TabNavigator>
            <Tab title='DESCRIPTION'>
                {productMock.description}
            </Tab>
            <Tab title='INGREDIENTS'>
                {productMock.ingredients}
            </Tab>
        </TabNavigator>,
    )
    .add('PurchaseOptionList', () =>
        <PurchaseOptionList data={productMock.purchaseOptions} value={1}/>
    )
    .add('ProductCard', () =>
        <ProductCard product={productMock}/>,
    )
    .add('ProductView', () =>
        <ProductView product={productMock}/>,
    )
