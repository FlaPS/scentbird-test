import {css} from 'styled-components'

export const sizes = {
    desktop: 1024,
    tablet: 720,
    phone: 480,
}

export const media = {
    desktop: (...as: any[]) => css`
        @media (min-width: ${sizes.desktop / 16}em) {
          // @ts-ignore
          ${css(...as)}
        }
     `,

    desktopMax: (...as: any[]) => css`
        @media (max-width: ${sizes.desktop / 16}em) {
          // @ts-ignore
          ${css(...as)}
        }
     `,
    landscapeMax: (...as: any[]) => css`
        @media (max-width: ${sizes.desktop / 16}em)  {
          // @ts-ignore
          ${css(...as)}
        }
    `,
    landscapeMin: (...as: any[]) => css`
        @media (min-width: ${sizes.tablet / 16}em)  {
          // @ts-ignore
          ${css(...as)}
        }
    `,
    portraitMax: (...as: any[]) => css`
        @media (max-width: ${sizes.tablet / 16}em)  {
          // @ts-ignore
          ${css(...as)}
        }
     `,
    portraitMin: (...as: any[]) => css`
        @media (min-width: ${sizes.phone / 16}em)  {
          // @ts-ignore
          ${css(...as)}
        }
     `,
    phone: (...as: any[]) => css`
        @media (max-width: ${sizes.phone / 16}em) {
          // @ts-ignore
          ${css(...as)}
        }
     `,
}
