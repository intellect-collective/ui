import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    asCheckable, asField, asGroupable, compose
} from '../utils';

const classes = (className, oval, worded) => (
    classnames(
        className || 'toggle',
        {
            'toggle-oval': oval,
            'toggle-worded': worded
        }
    )
);

class Toggle extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string,
        className: PropTypes.string,
        checked: PropTypes.bool,
        oval: PropTypes.bool,
        worded: PropTypes.bool
    };

    render() {
        const {
            className,
            oval,
            worded,
            ...rest
        } = this.props;
        return (
            <div className={ classes(className, oval, worded) }>
                <input type="checkbox" tabIndex="0" { ...rest } />
                <label htmlFor={ this.props.id || this.props.name }>
                    <span className="switch"><span className="switch-inner" /></span>
                </label>
            </div>
        );
    }
}

export default compose(
    asGroupable(),
    asField(),
    asCheckable()
)(Toggle);
