import React from 'react';

/**
 * The Textarea element produces an HTML textarea tag.
 *
 * All props not explicitly specified are passed through to the underlying
 * select tag. As a result, all global HTML attributes and all select attributes
 * are passed through.
 *
 * @param {Object} props - The props being passed to the component
 * @returns {Object} - An HTML input component
 */
const Label = (props) => {
    return (
        <label { ...props } />
    );
};
Label.displayName = 'Label';

export default Label;
