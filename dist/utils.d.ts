/**
 * Ensure an array of strings or args are returned as a flattened array.
 *
 * @param  {...string|array} args
 * @returns {array}
 */
export declare function array(...args: any[]): any;
/**
 * Creates a date and adds the length in seconds.
 *
 * @param {number|null} length
 * @returns {Date}
 */
export declare function date(length?: any): Date;
/**
 * Extract the values using the keys from an object of key/value pairs. If
 * multiple keys are passed, an array of values will be returned. If an array
 * of results is passed, a recursive array of extracted values will be returned.
 *
 * @param {object|array} subject
 * @param {string|array} keys
 */
export declare function extract(subject: any, keys: any): any;
/**
 * Get the first element from array.
 *
 * @param  {...any} args
 * @return {any}
 */
export declare function first(...args: any[]): any;
/**
 * Determines if a value is `false`.
 *
 * @param {any} value
 * @returns {boolean}
 */
export declare function isFalse(value: any): boolean;
/**
 * Determines if a value is `null`.
 *
 * @param {any} value
 * @returns {boolean}
 */
export declare function isNull(value: any): boolean;
/**
 * Determines if a value is a plain `object`.
 *
 * @param {any} value
 * @returns {boolean}
 */
export declare function isObject(value: any): boolean;
/**
 * Determines if a value is `string`.
 *
 * @param {any} value
 * @returns {boolean}
 */
export declare function isString(value: any): boolean;
/**
 * Determines if a value is `undefined`.
 *
 * @param {any} value
 * @returns {boolean}
 */
export declare function isUndefined(value: any): boolean;
/**
 * Convert an array of docs into a Map object using an attribute that will be
 * used a map's key. If an attribute is passed as a function, the returned
 * value will be used as the key.
 *
 * @param {array|object} docs
 * @param {string|function} attribute
 * @param {string|array} defaultKeys
 * @returns {Map}
 */
export declare function map(docs: any, attribute: any, defaultKeys?: any[]): any;
/**
 * Checks a value and converts it to a Promise. If the value is a function,
 * it will be executed by passing the remaining arguments before returning the
 * value as a resolved promise.
 *
 * @param {any} value
 * @param  {...any} args
 * @returns {Promise}
 */
export declare function promise(value: any, ...args: any[]): Promise<any>;
/**
 * Takes a value, merges them into a subject array, and dynamically composes
 * a response. If the subject is empty, then return undefined. If the subject
 * length is 1, then return the first item in the subject. If more than 1 item
 * in the subject, return the entire array.
 *
 * @param  {Map} subject
 * @returns
 */
export declare function results(mapped: any, fn?: (value: any) => any): any;
export declare function remove(db: any, docs: any): Promise<any>;
/**
 * Leaving this deprecated function in the library in case we need it later.
 *
 * @deprecated
 * @param {string} method
 * @param {...any} args
 * @returns {Promise}
 */
export declare function retryUntilSucceeds(method: any, ...args: any[]): any;
/**
 * If the subject is an object, convert it to entries and extract the values.
 * Otherwise just return the subject value.
 *
 * @param {any} subject
 * @returns {any}
 */
export declare function values(subject: any): any;
/**
 * Throw a console warning if the message is not undefined.
 *
 * @param {string|undefined} message
 */
export declare function warn(message: any): void;
