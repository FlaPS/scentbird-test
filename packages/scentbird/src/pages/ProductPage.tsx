import {connect} from 'react-redux'
import {caseRender} from '@sha/react-fp/'
import {applySpec, lensPath, view, compose} from 'ramda'
import {ProductView} from '../components/product/ProductView'
import {WithHistoryProps} from './WithHistoryProps'
import {nav} from '../store/'

const mapState = applySpec({
    product: view(lensPath(['app', 'products', '0'])),
    id: () => 0
})

const mapDispatch = (dispatch, {history}: WithHistoryProps) =>
    ({onAddToQueue: compose(history.push, nav.shipping)})

const MaybeProductView = caseRender(ProductView)
    .isNil('product', 'Продукт не найден')


export default connect(mapState, mapDispatch)(MaybeProductView)

