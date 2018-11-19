import React from 'react'
import {styled} from '../../styles/styled'
import {ExtractProps} from '@sha/react-fp/src'
import {PageLayout} from '../PageLayout'
import {media} from '../../styles/media'
import {ProductPicture} from '../elements'
import {ProductVO} from '../../store/scentbird/valueObjects'
import {ProductCard} from './ProductCard'

export const ProductView = ({
    product,
    id = 0,
    onAddToQueue = console.log,
    ...props}: ProductViewProps) =>
        <Layout>
            <ProductPicture className='bigPicture' url={product.url}/>
            <ProductCard
                className='card'
                onAddToQueue={() => onAddToQueue({id})}
                product={product}
            />
        </Layout>


type ProductViewProps = {
        id?: number
        onAddToQueue: ({id}) => any
        product: ProductVO
    }

const Layout = styled(PageLayout)`
    display: flex;
    justify-content: center;

    > .bigPicture {
      width: 45%;
      max-width: 458px;
      max-height: 458px;
      margin-right: 60px;
    }

    ${media.portraitMax`
        > .bigPicture {
            display: none;
        }

    `}



`
