/**
 * Ensure an array of strings or args are returned as a flattened array.
 * 
 * @param  {...string|array} args 
 * @returns {array}
 */
export function array(...args) {
    return []
        .concat(...args)
        .filter(value => {
            return !isFalse(value) && !isNull(value) && !isUndefined(value);
        })
        .flat();
}

/**
 * Creates a date and adds the length in seconds.
 * 
 * @param {number|null} length 
 * @returns {Date}
 */
export function date(length = null) {
    const date = new Date();

    if(typeof length === 'number') {
        date.setSeconds(date.getSeconds() + length);
    }

    return date;
}

/**
 * Extract the values using the keys from an object of key/value pairs. If
 * multiple keys are passed, an array of values will be returned. If an array
 * of results is passed, a recursive array of extracted values will be returned.
 * 
 * @param {object|array} subject 
 * @param {string|array} keys 
 */
export function extract(subject, keys) {
    // If the subject is a Map, then use recursion to extract the value from
    // object entries into an array of values.
    if(subject instanceof Map) {
        return Array.from(subject).map(([ key, value ]) => {
            return extract(value, keys);
        });
    }

    // If subject is an array, use recursion to extract the values into an 
    // array of values.
    if(Array.isArray(subject)) {
        return subject.map(result => {
            return extract(result, keys);
        });
    }

    // Make sure the keys are an array.
    keys = array(keys);

    // If the keys are an empty array, return the subject.
    if(!keys.length) {
        return subject;
    }
    
    // Extract the key/values and map then into an array.
    const arr = keys.map(key => isObject(subject) ? subject[key] : subject);

    // If the array is empty, return undefined.
    if(!arr.length) {
        return;
    }

    // If the array only has 1 value, return the value.
    if(arr.length === 1) {
        return arr.shift();
    }

    // Otherwise return the entire array.
    return arr;
}

/**
 * Get the first element from array.
 * 
 * @param  {...any} args
 * @return {any}
 */
export function first(...args) {
    return [].concat(...args).shift();
}

/**
 * Determines if a value is `false`.
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isFalse(value) {
    return value === false;
}

/**
 * Determines if a value is `null`.
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isNull(value) {
    return value === null;
}

/**
 * Determines if a value is a plain `object`.
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Determines if a value is `string`.
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * Determines if a value is `undefined`.
 * 
 * @param {any} value 
 * @returns {boolean}
 */
export function isUndefined(value) {
    return value === undefined;
}

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
export function map(docs, attribute, defaultKeys = []) {
    // If the docs are already an instance of Map, just return it.
    if(docs instanceof Map) {
        return docs;
    }

    if(attribute === undefined) {
        throw new Error(
            'You must specify an attribute for the map\'s key.'
        );
    }

    const map = new Map<string,any>(
        array(defaultKeys).map(key => [key, undefined])
    );

    return array(docs).reduce((map, doc) => {
        const key: string = typeof attribute === 'function'
            ? attribute(doc)
            : doc[attribute];

        return map.set(key, doc);
    }, Object.assign(map, {
        first(...args) {
            return extract(this.toArray().shift(), [...args]);
        },
        last() {
            return this.toArray().pop();
        },
        toArray() {
            return Array.from(map.values());
        },
        toJson() {
            return Object.fromEntries(map);
        }
    }));
}

/**
 * Checks a value and converts it to a Promise. If the value is a function,
 * it will be executed by passing the remaining arguments before returning the
 * value as a resolved promise.
 * 
 * @param {any} value 
 * @param  {...any} args 
 * @returns {Promise}
 */
export function promise(value, ...args) {
    if(value instanceof Promise) {
        return value;
    }

    if(typeof value === 'function') {
        return Promise.resolve(value(...args));
    }

    return Promise.resolve(value);
}

/**
 * Takes a value, merges them into a subject array, and dynamically composes
 * a response. If the subject is empty, then return undefined. If the subject
 * length is 1, then return the first item in the subject. If more than 1 item
 * in the subject, return the entire array.
 * 
 * @param  {Map} subject 
 * @returns 
 */
export function results(mapped, fn = value => value) {
    if(!mapped.size) {
        return;
    }

    if(mapped.size === 1){
        return fn(mapped.first());
    }

    return Object.fromEntries(
        Array.from(mapped).map(([key, value]) => {
            return [key, fn(value)];
        })
    );
}

export async function remove(db, docs) {
    // Convert the docs to entries
    const entries = Object.entries(docs);

    // Loop through the entries and remove the docs, and set the promise
    // back to the object.
    for(const [key, doc] of entries) {
        docs[key] = doc && await db.remove(doc);
    }

    // Return an array JSON results.
    return results(map(docs, 'id'));
}

/**
 * Leaving this deprecated function in the library in case we need it later.
 * 
 * @deprecated
 * @param {string} method
 * @param {...any} args
 * @returns {Promise}
 */
export async function retryUntilSucceeds(method, ...args) {
    try {
        return await promise(method(...args));
    }
    catch(e) {
        if(e.status === 409) {
            return await retryUntilSucceeds(method, ...args);
        }

        throw e;
    }
}

/**
 * If the subject is an object, convert it to entries and extract the values.
 * Otherwise just return the subject value.
 * 
 * @param {any} subject 
 * @returns {any}
 */
export function values(subject) {
    if(isObject(subject)) {
        return Object.entries(subject).map(([key, value]) => values(value));
    }

    return subject;
}

/**
 * Throw a console warning if the message is not undefined.
 * 
 * @param {string|undefined} message 
 */
export function warn(message) {
    if(message) {
        console.warn(message);
    }
}