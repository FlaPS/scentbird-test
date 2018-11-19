import React from 'react'
import styled from 'styled-components'
import {DivProps, Dummy, renderChildren} from '@sha/react-fp'
import {throwExpression} from '@sha/utils'

export const TabNavigator = ({children = [], ...props}: TabNavigatorProps) => {
    const [value, onChange] = React.useState(0)

    return <div {...props} >
        <TabBar >
            {children.map(
                ({props}: any, index: number) =>
                    <button key={index}
                            onClick={() => onChange(index)}
                            className={index === value ? 'active' : ''}
                    >
                        {props.title}
                    </button>,
            )}

        </TabBar>
        {value < children.length
            ? renderChildren(children[value].props.children)
            : throwExpression(`No tab with index "${value}" found, children length equals ${children.length}`)
        }
    </div>

}

export const Tab = Dummy as React.ComponentType<& DivProps
    & {
    title: string
}>

export type TabNavigatorProps =
    & DivProps
    & {
    children?: any
}

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9B9B9B;
  > :not(:last-child) {
    margin-right: 8px;
  } 
  > button {
      border-left: 1px solid #E6E6E6;
      border-right: 1px solid #E6E6E6;
      border-top: 1px solid #E6E6E6;
      border-bottom: none;
      background-color: white;
      margin-bottom: 0px;
      width: 100%;
      min-height: 40px;
  }
  > .active {
      border-left: 1px solid #9B9B9B;
      border-right: 1px solid #9B9B9B;
      border-top: 1px solid #9B9B9B;
      margin-bottom: -1px;

  }
`


