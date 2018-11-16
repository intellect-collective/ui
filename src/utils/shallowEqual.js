/* eslint-disable valid-jsdoc */

import is from './is';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license.
 * This code has been reused, with great appreciation, from
 * https://github.com/facebook/fbjs/blob/6b98068fa3836ba42ba824aee90e6c6c959225c7/packages/fbjs/src/core/shallowEqual.js
 */
const { hasOwnProperty } = Object.prototype;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export default function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null
            || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i])
                || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}
