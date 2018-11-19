import React from 'react'
import styled from 'styled-components'
import {DivProps} from '@sha/react-fp/src/index'

export type WithGridArea = {
    gridArea?: string
}

export const gridAreaMixin = (props: WithGridArea) =>
    props.gridArea
        ? 'grid-area:' + props.gridArea + ';'
        : ''


export default styled.div`
  width: 100%;

  ${gridAreaMixin}
` as React.ComponentType<WithGridArea & DivProps>
