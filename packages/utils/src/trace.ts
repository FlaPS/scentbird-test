import {curry} from 'ramda'
/**
 * Tap function to test incoming auments and the result of a function call
 *
 * <example>
 *     const fnc = (a, b) => a + b
 *     const tracedSum = trace('sum call', 'log')
 *     tracedSum(fnc)(2, 3)
 *     // console outputs :  sum call, fnc,
 *     // ARGS: 2, 3
 *     // RESULT: 5
 *
 * </example>
 */

type TraceLevel =
    | 'log'
    | 'debug'
    | 'warn'
    | 'error'
    | 'info'
    | 'debugger interrop'

export default curry(<T = undefined>(message: string = 'trace call', traceLevel: TraceLevel = 'log', f: (...params: any[]) => T ) =>
        (...as): T => {
            const time = new Date().valueOf()
            const result = f(...as)
            const elapsedTime =  new Date().valueOf() - time
            if (traceLevel === 'debugger interrop')
                debugger
            else
                console[traceLevel](
                    message,
                    'function ' + f.name,
                    'elapsedTime ' + elapsedTime,
                    '\nARGS:', ...as,
                    '\nRESULT:', result,
                )
            return result
        },
)