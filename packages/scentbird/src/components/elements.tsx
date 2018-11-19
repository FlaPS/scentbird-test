import React from 'react'
import {styled} from '../styles/styled'
import {DivProps, ExtractProps, Renderable, renderChildren} from '@sha/react-fp'
import {prop} from 'ramda'
import {media} from '../styles/media'

export const PrimaryButton = styled.button`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #FF408E;
    height: 50px;
    content: "add to queue";
    border: none;
    text-transform: uppercase;
    transition: width 0.5s;
    width: 100%;
`

export const BackLink = ({children = 'Back', ...props}: ExtractProps<typeof BackLinkLayout>) =>
    <BackLinkLayout {...props} children={children} href='javascript:history.back()'/>


const BackLinkLayout = styled.a`
    line-height: 50px;
    font-size: 18px;
    padding: 0px 50px;
    text-align: center;
    text-decoration: none;
    color: #000000;
`

export const AddonButton = (
    {addon, children, ...props}: { addon?: Renderable } & ExtractProps<typeof IconButtonLayout>) =>
    <IconButtonLayout {...props}>
        <div className='label'>
            {children}
        </div>
        <div className='addon'>
            {renderChildren(addon)}
        </div>
    </IconButtonLayout>

const IconButtonLayout = styled(PrimaryButton)`
    display: flex;
    align-items: center;

    > .label {
        text-align: center;
        width: 100%;
    }

    > .addon {
        margin-right: 30px;
        ${media.phone`
            display: none;
        `}
    }
`

type ProductPictureProps = { url: string, size?: number, inlineBlock?: boolean } & DivProps

const sizeMixin = ({size}: any) =>
    size && `
        min-width: ${size}px;
        min-height: ${size}px;
    `

export const ProductPicture = styled('div')`
    background: url(${prop('url')}) no-repeat;
    content: "";
    background-size: contain;
    background-position: center;
    ${sizeMixin};
    display: ${({inlineBlock}: any) => inlineBlock ? 'inline-block' : 'inline'};
` as any as React.ComponentType<ProductPictureProps>

export const HDivider = styled.hr`
  height: 1px;
  width: 100%;
  border: none;
  background-color: #E6E6E6;
`
