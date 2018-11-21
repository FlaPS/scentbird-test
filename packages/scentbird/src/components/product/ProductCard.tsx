import React from 'react'
import {styled} from '../../styles/styled'
import {ProductVO} from '../../store/scentbird/valueObjects'
import {ExtractProps} from '@sha/react-fp'
import {ProductTitle} from './ProductTitle'
import {Rating} from './Rating'
import {SelectedPurchase} from './SelectedPurchase'
import {HDivider, PrimaryButton, ProductPicture} from '../elements'
import {Tab, TabNavigator} from './TabNavigator'
import {PurchaseOptionList} from './PurchaseOptionList'
import {Collapsable} from './Collapsable'
import {media} from '../../styles/media'
import MediaTest from '../MediaTest'

const log = console.log

export const ProductCard = ({product, onAddToQueue = log, ...props}: ProductCardProps) => {

    const [optionIndex, setOptionIndex] = React.useState(0)
    return  <Layout {...props}>
                <ProductTitle product={product}/>
                <Rating className="rating" product={product}/>
                <ProductPicture className="smallImage" size={315} url={product.url} />
                <HDivider/>
                <div className='queue'>
                    <SelectedPurchase value={product.purchaseOptions[optionIndex]}/>
                    <PrimaryButton
                        onClick={onAddToQueue}
                        className='action'
                    >
                        Add to queue
                    </PrimaryButton>
                </div>
                <PurchaseOptionList
                    data={product.purchaseOptions}
                    value={optionIndex}
                    onValue={setOptionIndex as any}
                />
                <Collapsable>
                    {product.description}
                </Collapsable>
                <TabNavigator>
                    <Tab title='HOW IT WORKS'>
                        {product.howIsWorks}
                    </Tab>
                    <Tab title='INGREDIENTS'>
                        {product.ingredients}
                    </Tab>
                </TabNavigator>
            </Layout>
}

const queueRowMixin = `
    flex-direction: row;
    > .action {
       margin-top: 0px;
       margin-left: 8px;
       max-width: 190px;
    }
`

const queueColumnMixin = `
    flex-direction: column;
    > .action {
      margin-left: 0px;
      margin-top: 20px;
      max-width: unset;
    }
`

const Layout = styled.div`
  max-width: 512px;

  > * {
     margin-bottom: 20px;
  }

  ${media.portraitMax`
      display: block;
      max-width: unset;
      align-items: center;
      > .rating {
          text-align: center;
      }
  `}

  > .queue {
    display: flex;
    justify-content: space-between;
    ${queueRowMixin}
    ${media.landscapeMax`${queueColumnMixin}`}
    ${media.portraitMax`${queueRowMixin}`}
    ${media.phone`${queueColumnMixin}`}
  }


  > .smallImage {
      display: none;
      
      ${media.portraitMax`
            display: block;
      `}

      ${media.phone`
            display: block;
            width: 280px;
            height: 280px;
      `}
  }
`

export type ProductCardProps = {
    product: ProductVO
    onAddToQueue?: Function
} & ExtractProps<typeof Layout>
