import React from 'react'
import styled from 'styled-components'
import {DivProps, EMPTY_VALUE} from '@sha/react-fp/'
import {ProductVO} from '../../store/scentbird/valueObjects'
import {media} from '../../styles/media'

export const ProductTitle = ({
                                 product = EMPTY_VALUE,
                                 purpose = product.purpose,
                                 brand = product.brand,
                                 name = product.name,
                                 ref,
                                 ...props
                             }: ProductTitleProps & DivProps) =>
    <Layout {...props}>
        <div className='brand'>{brand}</div>
        <div className='name'>{name}</div>
        <div className='purpose'>{purpose}</div>
    </Layout>

type ProductTitleProps = {
    brand?: string
    name?: string
    purpose?: string
    product?: ProductVO
}

const Layout = styled.div`
    font-size: 24px;
    > .brand {
        text-transform: uppercase;

    }
    > .name {
        color: #333333;
        line-height: 20px;
    }
    > .purpose {
        color: #333333;
    }

    ${media.portraitMax`
        text-align: center;
    `}
    
    ${media.phone`
        font-size: 18px;
        > .purpose {
            color: #333333;
            font-size: 12px;
        }

    `}

`
