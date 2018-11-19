import {connect} from 'react-redux'
import {applySpec, lensPath, view} from 'ramda'
import {InfoView} from '../components/info/InfoView'
import { infoDuck } from '../store/scentbird'

const mapState = applySpec({
    state: view(lensPath(['app', 'info'])),
})

const mapDispatch = (dispatch: any) => ({dispatch, act: infoDuck.act})


export default connect(mapState, mapDispatch)(InfoView)

