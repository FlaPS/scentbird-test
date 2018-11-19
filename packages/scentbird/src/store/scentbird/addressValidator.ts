import {complement, compose, evolve, isEmpty, mergeDeepRight, trim, forEach, values, prop} from 'ramda'
import {defaultAddressVO, ShippingAddressVO} from './valueObjects'
import {Validator} from './createFormDuck'

const EMPTY_PATTERN = /^(?!\s*$).+/
const ONLY_LETTERS = /^[a-zA-Z\s]+$/
const ONLY_DIGITS = /^[0-9]+$/

export const addressErrors = {
    required: 'This field is required',
    malformed: 'Wrong formal',
    wrongCode: 'Wrong zip/postal code',
    onlyLetters: 'Only English alphabetic symbols are allowed'
}

const check = (pattern = EMPTY_PATTERN, error = addressErrors.malformed) => (value: string) =>
    isNotEmpty(value)
        ? pattern.test(value)
        ? undefined
        : [error]
        : [addressErrors.required]

const isNotEmpty = compose(complement(isEmpty), trim)
const onlyLetters = check(ONLY_LETTERS, addressErrors.onlyLetters)
const onlyDigits = check(ONLY_DIGITS, addressErrors.wrongCode)
const any = () => []
const evolveAddress = evolve({
    firstName: onlyLetters,
    lastName: onlyLetters,
    street: check(),
    postalCode: onlyDigits,
    country: onlyLetters,
    suite: any,
    phone: any,
})

const prepareObj = mergeDeepRight(defaultAddressVO)
export const validateAddress = compose(
    evolveAddress,
    prepareObj,
) as Validator<Partial<ShippingAddressVO>>  // validate both Shipping and Billing addresses

export const isValidFormData = compose(forEach(isEmpty), values, prop<any, any>('errors'))




