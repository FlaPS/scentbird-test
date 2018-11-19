import {addressErrors, validateAddress} from '../store/scentbird/addressValidator'
import {compose, forEach, isEmpty, values} from 'ramda'

const log = console.log

test('Check totally wrong case', () => {
    const invalidResult = validateAddress({
        firstName: '  ', // error
        suite: 'o', // ok
        lastName: 'Blo w23',
        postalCode: '23r',
        street: '',
        country: '',
    })

    log('// optional fields are not required')
    expect(invalidResult.suite).toEqual(undefined)

    log('// fields with spaces only do not pass required filter')
    expect(invalidResult.firstName![0]).toEqual(addressErrors.required)

    log('// Last name could not have any digits')
    expect(invalidResult.lastName![0]).toEqual(addressErrors.onlyLetters)

    log('// Postal/Sip code should include digits only')
    expect(invalidResult.postalCode![0]).toEqual(addressErrors.wrongCode)


})

test('Check happy path', () => {
    const validResult = validateAddress({
        firstName: 'Max', // error
        suite: 'ap 8', // ok
        lastName: 'Shammasov',
        postalCode: '197240',
        street: 'Smolenskaya 1',
        country: 'Russian Federation',
        phone: '+7 (903) 855 33 99',

    })

    const noErrors = compose(forEach(isEmpty), values)
    log('// No one field has errors')
    expect(noErrors(validResult)).toBeTruthy()


})

