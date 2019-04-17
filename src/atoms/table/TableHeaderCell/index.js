import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { onKeyDown as onKeyDownFn } from '../../../common';
import { columnProp } from '../prop-types';
import { ifSort } from '../utils';

const noop = () => {};

export default class ColumnHeader extends React.Component {
    static propTypes = {
        column: columnProp.isRequired,
        sorting: PropTypes.string,
        onHeaderClick: PropTypes.func
    };

    static defaultProps = {
        onHeaderClick: noop
    };

    constructor() {
        super();
        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onHeaderClick(ev) {
        if (this.props.onHeaderClick) {
            this.props.onHeaderClick(
                this.props.column.field,
                ifSort(this.props.column.field, this.props.sorting, '-', undefined, '+'),
                ev
            );
        }
    }

    onKeyDown(ev) {
        onKeyDownFn(this.onHeaderClick)(ev);
    }

    render() {
        if (this.props.column.sortable === false
                || !this.props.column.field) {
            return (
                <th>
                    <span>{ this.props.column.title }</span>
                </th>
            );
        }

        const aria = ifSort(this.props.column.field, this.props.sorting, 'ascending', 'descending');
        const className = ifSort(this.props.column.field, this.props.sorting, 'sorting-asc', 'sorting-desc');
        const classNames = classnames('sortable', className, this.props.column.headerClasses);
        return (
            <th className={ classNames }
                    onClick={ this.onHeaderClick }
                    onKeyDown={ this.onKeyDown }
                    scope="col"
                    role="columnheader"
                    aria-sort={ aria }
                    tabIndex="-1">
                { this.props.column.title }
            </th>
        );
    }
}
