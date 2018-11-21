import {ProductVO} from './valueObjects'

export const productMock: ProductVO = {
    brand: 'Scentbird',
    name: 'Rose & Prosecco',
    purpose: 'Hand Cream',
    url: '/HandCream.png',
    rating: 3.65,
    reviews: 23,
    purchaseOptions: [
        {
            size: 1.7,
            price: 14.95,
            type: 'subscription',
            url: '/HandCream.png',
        },
        {
            size: 1.7,
            price: 19.95,
            type: 'demand',
            url: '/HandCream.png',
        },
        {
            size: 1,
            price: 12.95,
            type: 'demand',
            url: '/HandCream.png',
        },
    ],
    description: `
        The new olfactory variation of Eau de Cartier reveals its unexpected
        ardent woody freshness. Essence de Bois is the unexpected combination
        of the freshness of water and the warmth of precious wood. This alluring
        fragrance leaves a lingering trail for him and for her, both fresh and sensual
    `,
    ingredients: `
        <ul>
           <li> 1 oz (28 g) caffeine citrate</li>
           <li> 3 oz (85 g) citric acid</li>
           <li> 1 US fl oz (30 ml) vanilla extract</li>
           <li> 1 US qt (946 ml) lime juice</li>
           <li>  2.5 oz (71 g) "flavoring", i.e., "Merchandise 7X"</li>
           <li>  30 lb (14 kg) sugar</li>
           <li>  4 US fl oz (118.3 ml) fluid extract of coca leaves (flavor essence of the coca leaf).</li>
           <li>  2.5 US gal (9.5 l; 2.1 imp gal) water</li>
           <li>  caramel sufficient to give color</li>
       </ul>
    `,
    howIsWorks: `
        Rebottled Eau de Cartier Essence de Bois, rebottled by Scentbird, Inc.,
        an independent bottler from a genuine product wholly independent of Cartier
        Scentbird, Inc., New York, NY 10001
    `,
}
