import React from 'react'
import {storiesOf} from '@storybook/react'
import {DebugProps} from './DebugProps'
import styled from 'styled-components'
import {AddonButton, BackLink, PrimaryButton} from './elements'
import {media} from '../styles/media'
import MediaTest from './MediaTest'
import {CheckBox} from './inputs/CheckBoxInput'
import SVGLibrary from '../styles/SVGLibrary'


storiesOf('atoms', module)
    .add('DebugProps', () =>
        <DebugProps
            url='bla-bla'
        />,
    )
    .add('CheckBox', () =>
        <CheckBox label='Use this address as my billing address'/>
    )
    .add('Primary Button', () =>
        <PrimaryButtonLayout>
            <PrimaryButton>
                Add to queue
            </PrimaryButton>
        </PrimaryButtonLayout>,
    )
    .add('Back button', () =>
        <BackLink/>
    )
    .add('Buy button', () =>
        <AddonButton addon={SVGLibrary.ForwardIcon}>BUY NOY</AddonButton>
    )
    .add('Media quieries test', () => <MediaTest>TestOne </MediaTest>)

    
const PrimaryButtonLayout = styled.div`
    width: 50%;
    transition: width 0.5s;

    ${media.landscapeMin(' width: 100%;')}

    > ${PrimaryButton} {
    width: 50%;
    }

`
