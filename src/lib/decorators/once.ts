/**
 * once(fn)
 * 
 * creates a version of the function that executes only once. It’s useful for
 * an initialization function, where we want to make sure it  runs only once,
 * no matter how many times it is called from different places.
 * 
 * @param {\} fn 
 */

 /* eslint-disable @typescript-eslint/no-explicit-any */

export default function once(fn: Function): Function  {
    let canRun = true;
    
	return function runOnce(...args: any): any {
        let returnValue: any;
		if(canRun) {
			returnValue = fn.apply(this, args);
			canRun = false;
		}
		return returnValue;
	}
}