import React from 'react'
import {styled} from '../styles/styled'
import {media} from '../styles/media'

export default styled.div`
    min-height: 100px;
    
    &:after{
    
      ${media.desktop`
        content: "desktop";
      `}
    
      ${media.landscapeMax`
        content: "landscape";
      `}
    
       ${media.portraitMax`
        content: "portrait";
      `}
    
       ${media.phone`
        content: "phone";
      `}
    }
` as React.ComponentType<any>
