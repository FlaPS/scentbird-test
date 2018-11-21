import {OnValue, Renderable} from '@sha/react-fp'
import {ErrorMap, TouchMap} from '../../store/scentbird/createFormDuck'


export const propertyPayload = <T, F>(field: F) => (value: any) => ({property: field, value})
/**
 * Example
 *         <StringInput gridArea={'fn'} {...bindInput(props)('firstName')} label='First name'/>
 */
export const bindInput = <D extends object>({state: {value = {} as D, errors = {}, touched = {}} = {}, onPropertyChange}: FormProps<D>) =>
    <K extends keyof D>(field: K): InputProps<D[K]> =>
        ({
            onValue: (fieldValue: D[K]) => onPropertyChange && onPropertyChange({property: field, value: fieldValue}),
            value: value[field],
            errors: errors[field],
            touched: touched[field],
        })

export type InputProps<T> = {
    optional?: boolean
    label?: Renderable
    value?: T
    onValue?: OnValue<T>
    gridArea?: string
    touched?: boolean
    errors?: string[]
    name?: string
}

export type FormState<D> = {
    value?: D
    errors?: ErrorMap<D>
    touched?: TouchMap<D>
}

export type FormProps<D extends object> = {
    state: FormState<D>
    onPropertyChange?: <K extends keyof D>(payload: { property: K, value: D[K] }) => any
}

export const getHint = <T>({optional, label = ''}: InputProps<T>) =>
    label + (optional ? ' (Optional) ' : '')
