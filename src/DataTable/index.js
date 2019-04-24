import React from 'react';
import PropTypes from 'prop-types';
import memoizeLast from '../utils/memoizeLast';
import TableHeader from '../TableHeader';
import TableHeaderCell from '../TableHeaderCell';
import TableBody from '../TableBody';
import TableBodyCell from '../TableBodyCell';
import TableFooter from '../TableFooter';
import { columnProp } from '../utils/prop-types';

const noop = () => {};

/**
 * The Table class is a fully-controlled Table element which maintains no state
 * of its own and expects the caller to handle state and manipulation.
 *
 * If you are looking for a plug-n-play component, consider the `StandardTable`
 * wrapper implementation, which abstracts a great deal of the state management
 * for you.
 */
export default class DataTable extends React.Component {
    static propTypes = {
        /**
         * The data to be displayed in the table. An array of objects whose
         * shapes match the column set provided.
         */
        data: PropTypes.arrayOf(PropTypes.object),
        /**
         * A list of the columns to display. By altering this set, one may
         * show/hide or alter the operation or appearance of columns
         * dynamically, for example allowing users to toggle visible columns.
         */
        columns: PropTypes.arrayOf(columnProp).isRequired,
        /**
         * The current sort field and direction, indicated as the field name,
         * prefixed by a `-` in the case of descending order.
         */
        sorting: PropTypes.string,

        /**
         * An event-handling function that is called when a row is clicked
         */
        onRowClick: PropTypes.func,
        /**
         * An event-handling function that is called when a header is clicked
         */
        onHeaderClick: PropTypes.func,

        className: PropTypes.string,
        classNames: PropTypes.shape({
            noDataClass: PropTypes.string
        }),
        elements: PropTypes.shape({
            header: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
            headerCell: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
            body: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
            bodyCell: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
            footer: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
        })
    };

    static defaultProps = {
        data: [],
        onRowClick: noop,

        className: 'data-table',
        classNames: {
            noDataClass: 'no-data'
        },

        elements: {
            header: TableHeader,
            headerCell: TableHeaderCell,
            body: TableBody,
            bodyCell: TableBodyCell,
            footer: TableFooter
        }
    };

    constructor() {
        super();
        this.getVisibleColumns = this.getVisibleColumns.bind(this);
        this.getIdField = this.getIdField.bind(this);
    }

    getVisibleColumns = memoizeLast(() => (
        this.props.columns
            .filter((col) => {
                return Boolean(col) && col.visible !== false;
            })
    ), () => (this.props.columns))

    getIdField = memoizeLast(() => {
        const idField = this.props.columns.find((c) => (c.id));
        if (idField) {
            return idField.field;
        }

        return this.props.columns.find((c) => (!!c.field)).field;
    }, () => (this.props.columns));

    //
    // Rendering
    //
    render() {
        const {
            data,
            columns,
            sorting,

            onRowClick,
            onHeaderClick,

            classNames,
            elements: {
                header: Header = TableHeader,
                headerCell: HeaderCell = TableHeaderCell,
                body: Body = TableBody,
                bodyCell: BodyCell = TableBodyCell,
                footer: Footer = TableFooter
            },
            ...rest
        } = this.props;

        return (
            <table { ...rest }>
                <Header { ...this.props }
                        columns={ this.getVisibleColumns() }
                        idField={ this.getIdField() }
                        cell={ HeaderCell } />
                <Body { ...this.props }
                        columns={ this.getVisibleColumns() }
                        idField={ this.getIdField() }
                        cell={ BodyCell } />
                <Footer { ...this.props }
                        columns={ this.getVisibleColumns() }
                        idField={ this.getIdField() } />
            </table>
        );
    }
}
