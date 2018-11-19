import React from 'react'
import {styled} from '../../styles/styled'
import {ProductPicture} from '../elements'
import {ButtonProps, ExtractProps, OnValue, onValueCallback} from '@sha/react-fp'
import {PurchaseOptionVO} from '../../store/scentbird/valueObjects'
import {media} from '../../styles/media'


export const PurchaseOptionList = ({data = [], onValue, value = 0, ...props}: PurchaseOptionListProps) =>
    <Layout {...props}>
        {data.map((option, key) =>
            OptionButton({
                ...option,
                key,
                isActive: value === key,
                onClick: onValueCallback(onValue, key)
            })
        )}
    </Layout>


const OptionButton = ({url, size, type, ref, ...props}: OptionButtonProps) =>
    <OptionBackground  {...props} >
        <ProductPicture url={url} size={40} inlineBlock/>
        {getLabel(size, type)}
    </OptionBackground>

const getLabel = (size, type) =>
    type === 'demand'
        ? [
            <div className='full'>{size} Oz <nobr>One-time</nobr> purchase</div>,
            <div className='short'>{size} Oz <nobr>One-time</nobr></div>,
        ]
        : <div>{size} Oz Subscription</div>

type OptionBackgroundProps = {
    isActive: boolean
} & ButtonProps

type OptionButtonProps = OptionBackgroundProps & {
    url: string
} & PurchaseOptionVO

type PurchaseOptionListProps = {
    data?: PurchaseOptionVO[]
    onValue?: OnValue<number>,
    value?: number
} & ExtractProps<typeof Layout>

const isActive = ({isActive}: any) =>
    isActive
        ? '#FF408E'
        : '#E6E6E6'

const OptionBackground = (styled.button`
  border: 1px solid ${isActive};
  background-color: #FFFFFF;
  display: flex;
  width: calc(1/2*100% - (1 - 1/2)*8px);
  height: 50px;
  margin-bottom: 8px;
  align-items: center;
  text-align: left;
  overflow: hidden;
  > .short {
            display: none;

        }
        > .full {
            display: block;

        }
  ${media.phone`
        > .short {
            display: block;
        }
        > .full {
            display: none;
           
        }
  `}
`) as React.ComponentType<OptionBackgroundProps>


const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`
