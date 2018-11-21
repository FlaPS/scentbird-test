import React from 'react'
import {styled} from '../../styles/styled'
import {bindInput, FormProps} from '../inputs/Input'
import {StringInput} from '../inputs/StringInput'
import {media} from '../../styles/media'
import {ShippingAddressVO} from '../../store/scentbird/valueObjects'
import {ExtractProps} from '@sha/react-fp'

export const AddressForm = ({hasPhone, title, ...props}: DetailViewProps) => {
    const bind = bindInput(props)
    return  <Layout {...props}>
                <div className='title'>{title}</div>
                <StringInput gridArea={'fn'} {...bind('firstName')} label='First name'/>
                <StringInput gridArea={'ln'} {...bind('lastName')} label='Last name'/>
                <StringInput gridArea={'sa'} {...bind('street')} label='Street address'/>
                <StringInput gridArea={'ap'} {...bind('suite')} label='Apt/Suite' optional/>
                <StringInput gridArea={'in'} {...bind('postalCode')} label='Zip/Postal'/>
                <StringInput className='landscape' gridArea={'ct1'} label='State/Province'/>
                <StringInput className='landscape' gridArea={'ct2'} label='City'/>
                <StringInput gridArea={'cn'} {...bind('country')} label='Country'/>
            </Layout>
}

type DetailViewProps =
    & FormProps<ShippingAddressVO>
    & ExtractProps<typeof Layout>
    & {
        hasPhone?: boolean
        title: string
    }


const Layout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${media.portraitMax`
        > :not(:last-child) {
                margin-bottom: 29px;
            }
    `}

    .title {
      font-size: 24px;
      grid-area: hh;
      ${media.phone`
          font-size: 18px;
          text-align: center;
      `}
    }
    
    .remark {
          grid-area: hl;
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 50px
    }
    > .landscape {
          display: none;
    }


    ${media.landscapeMin`
        display: grid;
        grid-gap: 20px;

        grid-template-areas:
            "hh hh hh hh hh hh"
            "fn fn fn ln ln ln"
            "sa sa sa sa ap ap"
            "in in ct1 ct1 ct2 ct2"
            "cn cn cn cn cn cn";

        > .landscape {
            display: block;
        }

    `}


`
