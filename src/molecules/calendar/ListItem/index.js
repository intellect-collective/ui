import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FancyCheckbox from '../../../atoms/forms/FancyCheckbox';

const style = (calendar) => {
    const result = {};
    if (calendar.background) {
        result.background = calendar.background;
        result.borderColor = calendar.background;
    }
    if (calendar.color) {
        result.color = calendar.color;
    }
    return result;
};

const CalendarListItem = ({
    calendar: {
        id, title, hidden, ...calendar
    }, onChange
}) => (
    <li>
        <FancyCheckbox name="calendars"
                id={ id }
                value={ id }
                checked={ !hidden }
                onChange={ onChange }
                style={ style(calendar) } />
        <label className={ classnames({ hidden: Boolean(hidden) }) }
                htmlFor={ id }>
            <span>{ title }</span>
        </label>
    </li>
);
CalendarListItem.displayName = 'CalendarListItem';
CalendarListItem.propTypes = {
    calendar: PropTypes.object,
    onChange: PropTypes.func
};
export default CalendarListItem;
