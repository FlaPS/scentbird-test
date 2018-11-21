import React from 'react'
import {clamp, times} from 'ramda'
import {SVGLibrary} from '../../styles/SVGLibrary'
import styled from 'styled-components'
import {LightGrey} from '../../styles/Typography'
import {DivProps, EMPTY_VALUE} from '@sha/react-fp'
import {ProductVO} from '../../store/scentbird/valueObjects'

export const starsLength = 5
const starWidth = 13

export const Rating = ({
       product = EMPTY_VALUE,
       value = product.rating,
       quantOfReviews = product.reviews,
       ...props
   }: Partial<RatingProps>) =>
    <div {...props}>
        AVERAGE RATING <LightGrey>({quantOfReviews} reviews)</LightGrey>
        <br/>
        <RatingBar value={value} />
    </div>

const RatingBar = ({value = 0, ...props}: RatingBarProps) =>
    <div {...props}>
        <StarRow>
            {times(index =>
                    <ProgressStar
                        value={(value - index)}
                        key={index}
                    />,
                starsLength,
            )}
        </StarRow>
        <span>
            {(value).toFixed(1)} out of {starsLength}
        </span>
    </div>

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


type RatingProps = RatingBarProps & {
    product: ProductVO
    quantOfReviews?: number
}

type RatingBarProps =
    & DivProps
    & {
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




