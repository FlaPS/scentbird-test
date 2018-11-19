import {put, select, takeEvery} from 'redux-saga/effects'
import {infoDuck, InfoState} from './createInfoDuck'
import {FormState} from './createFormDuck'
import {validateAddress, isValid, isValidFormData} from './addressValidator'

export default function* scentbirdSaga() {
    yield takeEvery(infoDuck.act.submit.isType, checkSubmit)
}

function* checkSubmit() {
    const state: InfoState = yield select((state: any) => state.app)
    yield put(infoDuck.act.shipping(infoDuck.act.form.touchAll()))
    let shipping: FormState<any> = yield select((state: any) => state.app.info.shipping)
    let billing: FormState<any>

    // tap billing form also in case of addresses are different
    if (!state.useSame) {
        yield put(infoDuck.act.billing(infoDuck.act.form.touchAll()))

        billing = yield select((state: any) => state.app.info.billing)
        if (!isValidFormData(billing)) {
            console.error('There are errors in billing information')
            return
        }
    }

    if (!isValidFormData(shipping)) {
        console.error('There are errors in billing information')
        return
    }

    console.log('Success', shipping)
}