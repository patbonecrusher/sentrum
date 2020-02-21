/**
 * debounce(fn, wait)
 * 
 * creates a version of the function that, when invoked repeatedly, will call
 * the original function  after wait  milliseconds since the last invocation.
 * It’s useful  for running  a function  only  after  the event  has  stopped
 * arriving.
 * 
 * @param {*} fn 
 * @param {*} interval 
 */

 /* eslint-disable @typescript-eslint/no-explicit-any */

export default function debounce(fn: Function, interval: number): Function {
    let timer: NodeJS.Timeout;
    return function debounced(...args: any[]): void {
        clearTimeout(timer);
        const _args = args;
        timer = setTimeout(() => fn.apply(this, _args), interval);
    };
}