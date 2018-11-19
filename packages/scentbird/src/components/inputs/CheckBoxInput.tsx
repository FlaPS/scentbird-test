import {styled} from '../../styles/styled'
import {ExtractProps, renderChildren} from '@sha/react-fp/src/index'
import React from 'react'
import {InputProps} from './Input'


export const CheckBox = ({value, onValue, label, onChange, ...props}: ExtractProps<typeof Layout> & InputProps<boolean>) =>
    <Layout {...props}>
        {renderChildren(label)}
        <input
            type='checkbox'
            checked={value}
            onChange={(e: any) => {
                if (onChange) onChange(e)
                if (onValue) onValue(e['target']['checked'])
            }}
        />
        <span className='checkmark'></span>
    </Layout>

const Layout = styled.label`
    /* The container */

    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    padding-left: 24px;  // 16 + 8 px


    /* Hide the browser's default checkbox */
    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox*/
    > .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background: #E6E6E6;
        border: 1px solid #333333;
        box-sizing: border-box;
    }

    /* On mouse-over, add a grey background color */
    &:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a backgound & change borders */
    > input:checked ~ .checkmark {
        background: #FF6BA6;
        border: 1px solid #FF458F;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    > input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator, just a div with two rotated borders by 45 degrees */
    > .checkmark:after {
        left: 4px;
        top: 1px;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`
