import update from 'immutability-helper';
import is from '../../../utils/is';
import shallowEqual from '../../../utils/shallowEqual';

const isEmpty = (o) => (!o || Object.keys(o).length === 0);

export default (props, state) => {
    const result = {};

    // Set original if not already set
    if (isEmpty(state.original) && props.values) {
        result.original = { ...props.values };
    }

    // Set values if not already set
    if (isEmpty(state.values) && props.values) {
        result.values = { ...props.values };
    }

    // Set lastValues if not already set
    let shortcircuit = false;
    if (!isEmpty(state.lastValues) && props.values) {
        result.lastValues = { ...props.values };
        shortcircuit = true;
    }

    // All previously-dirty fields are no longer dirty. They're either
    // reconciled or marked conflicted.
    result.dirty = [];
    result.conflicts = {};

    // Set errors if not already set
    if (isEmpty(state.errors) && props.errors) {
        result.errors = { ...props.errors };
    }

    // Set the last errors to the newly updated prop errors
    const sameErrors = shallowEqual(state.lastErrors, props.errors);
    if (!sameErrors) {
        result.lastErrors = { ...props.errors };
    }

    // If we only just set values/lastValues, then we have no need to continue
    if (shortcircuit) {
        return result;
    }

    // Set the last values to the newly updated prop values
    const sameValues = shallowEqual(state.lastValues, props.values);
    if (!sameValues) {
        result.lastValues = { ...props.values };
    }

    // Update existing state values if prop values differ from original
    // values
    if (!sameValues) {
        result.values = { ...(result.values || state.values) };
        result.conflicts = { ...(state.conflicts || {}) };
        const stateKeys = Object.keys(result.values);
        const propKeys = Object.keys(props.values);
        const allKeys = stateKeys.concat(propKeys.filter((i) => (stateKeys.indexOf(i) < 0)));

        // Test each known key for equality
        for (let i = 0; i < allKeys.length; i++) {
            const k = allKeys[i];
            if (!Object.prototype.hasOwnProperty.call(result.values, k)) {
                // State does not have the value, so we can add it no problem
                result.values[k] = props.values[k];
                continue;
            }

            const same = is(result.values[k], props.values[k]);
            if (!same && (state.dirty || []).indexOf(k) === -1) {
                // State contains the key, field is not dirty, so we change it
                result.values[k] = props.values[k];
            } else if (!same) {
                // State contains the key, field is dirty, so we mark it conflicted
                result.conflicts[k] = props.values[k];
            } else {
                // If the same values, then we clear conflict
                result.conflicts = update(result.conflicts, { $unset: [k] });
            }
        }
    }

    return result;
};
