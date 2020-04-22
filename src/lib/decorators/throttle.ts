/**
 * throttle(fn, wait)
 * 
 * Creates a version of the function that, when invoked repeatedly, will call
 * the original  function once per  every wait milliseconds.  It’s useful for
 * limiting events that occur faster.
 *
 * @param {*} fn 
 * @param {*} interval 
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function throttle(fn: Function, interval: number): Function {
    let lastTime: number;
    return function throttled(...args: any[]): void {
        const timeSinceLastExecution = Date.now() - lastTime;
        if(!lastTime || (timeSinceLastExecution >= interval)) {
            fn.apply(this, args);
            lastTime = Date.now();
        }
    };
}