import React from 'react'
import {styled} from '../../styles/styled'
import {HTMLInputProps, onChangeCallback, renderChildren} from '@sha/react-fp'
import {getHint, InputProps} from './Input'
import {gridAreaMixin, WithGridArea} from './GridArea'
import {eqProps} from 'ramda'
import {debuggerExpression} from '@sha/utils'

type StringInputProps = InputProps<string> & HTMLInputProps & WithGridArea


export const StringInput =
    ({optional, label, onValue, onChange, gridArea, touched, errors = [], ...props}: StringInputProps) => {
        const [inFocus, setFocus] = React.useState(false)

        const renderLabel = () =>
            inFocus &&
            label &&
            <span className='label'>{renderChildren(label)}</span>

        const renderError = () =>
            (touched && errors.length ) 
                ? <span className='error'>{errors[0]}</span>
                : null

        return <Layout gridArea={gridArea} >
            <input
                {...props}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                required={
                    /* to call :invalid selector */
                    !optional && touched
                }
                placeholder={getHint({optional, label})}
                onChange={e =>
                    onChangeCallback(onValue)(e) &&
                    onChange && onChange(e)
                }
            />
            {renderLabel()}
            {renderError()}
        </Layout>
    }


const Layout = styled.div`

  ${gridAreaMixin};

  position: relative;
  width: 100%;
  height: 50px;

  margin-top: -9px;
  margin-bottom: 11px;

  > .label {
    position: absolute;
    padding: 0 5px;
    background: #ffffff;
    left: 11px;
  }

  > .error {
    position: absolute;
    top: 59px;
    color: #FF0000;
    font-size: 12px;
    width: 100%;
    text-align: right;
  }

  > input {
      position: absolute;
      top: 9px;
      padding: 0px 15px;
      font-size: 18px;
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      border: 1px solid #E6E6E6;
      background-color: #FAFAFA;
      font-family: "Proxima Nova";

      :invalid {
          border: 2px solid #FD6464;
      }
      :required:invalid {
        background: #FAFAFA;
      }
      :focus{
          outline: none !important;
          background-color: #FFFFFF;
          border: 1px solid rgba(255, 69, 143, 0.6);
      }

      :focus:invalid{
          outline: none !important;
          background-color: #FFFFFF;
          border: 2px solid #FD6464;
      }
      ::placeholder {
        color:  #9B9B9B;
      }
    }
`
