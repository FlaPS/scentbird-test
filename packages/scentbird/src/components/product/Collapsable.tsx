import React from 'react'
import styled from 'styled-components'
import {ExtractProps} from '@sha/react-fp/'

export const Collapsable = ({children, ...props}: ExtractProps<typeof Layout>) =>
    <Layout {...props}>
        <input type='checkbox' id='state'/>
        <section>
            {children}
        </section>
        <label htmlFor='state'/>
    </Layout>

const Layout = styled.div`
    section {
        max-height: 20px;
        overflow-y: hidden;
        transition: max-height .5s ease;
    }

    label {
        cursor: pointer;
        display: inline-block;
        line-height: 20px;
        font-size: 14px;
        color: #FF0A8F;
    }

    input {
        display: none;
    }

    input ~ label:before {
        content: 'Read more >';
    }

    input:checked ~ label:before {
        content: 'Read less <'
    }
    
    input:checked ~ section {
        max-height: 200px;
    }

`
