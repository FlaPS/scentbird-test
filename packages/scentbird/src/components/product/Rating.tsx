import React from 'react'
import {clamp, times} from 'ramda'
import {SVGLibrary} from '../../styles/SVGLibrary'
import styled from 'styled-components'
import {LightGrey} from '../../styles/Typography'
import {DivProps, EMPTY_VALUE} from '@sha/react-fp'
import {ProductVO} from '../../store/scentbird/valueObjects'


export const Rating = ({
                           product = EMPTY_VALUE,
                           value = product.rating,
                           quantOfReviews = product.reviews,
                           ...props
                       }: Partial<RatingProps>) =>
    <div {...props}>
        AVERAGE RATING 
        <LightGrey>({quantOfReviews} reviews)</LightGrey>
        <br/>
        <RatingBar value={value} quantOfReviews={quantOfReviews}/>
    </div>


export const starsLength = 5
const starWidth = 13


const ProgressStar = ({value = 0}: { value: number }) => {
    value = clamp(0, 1, value)
    return <RatingStarLayout>
        <SVGLibrary.RatingStar/>
        <SVGLibrary.RatingStar
            viewBox={'0 0 ' + value * starWidth + ' 12.4'}
            preserveAspectRatio='none'
            width={value * starWidth}
            style={{marginLeft: -starWidth}}
            fill='#FF408E'
        />
    </RatingStarLayout>
}

const RatingBar = ({value = 0, quantOfReviews = 1, ...props}: RatingBarProps) =>
    <div {...props}>
        <StarRow>
            {times(index =>
                    <ProgressStar
                        value={(value - index / starsLength) * starsLength}
                        key={index}
                    />,
                starsLength,
            )}
        </StarRow>
        <span>
            {(value / quantOfReviews * starsLength).toFixed(1)} out of {starsLength}
        </span>
    </div>

type RatingProps = RatingBarProps & {
    product: ProductVO
}

type RatingBarProps =
    & DivProps
    & {
    quantOfReviews: number
    value?: number
}


const RatingStarLayout = styled.div`
  margin-right: 7px;
  display: inline-block;
`


const StarRow = styled.span`
  display: inline-flex;
  margin-right: 7px;
`




