import React from 'react';
import PropTypes from 'prop-types';
import ColumnHeader from '../../atoms/table/ColumnHeader';
import memoizeLast from '../../utils/memoizeLast';
import { columnProp } from '../../atoms/table/prop-types';

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
        HeaderCell: PropTypes.func
    };

    static defaultProps = {
        data: [],
        onRowClick: noop,

        className: 'data-table',
        classNames: {
            noDataClass: 'no-data'
        },
        HeaderCell: ColumnHeader
    };

    constructor() {
        super();
        this.getVisibleColumns = this.getVisibleColumns.bind(this);
        this.getIdField = this.getIdField.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.render = this.render.bind(this);
    }

    getVisibleColumns() {
        return this.props.columns
            .filter((col) => {
                return Boolean(col) && col.visible !== false;
            });
    }

    getIdField() {
        const idField = this.props.columns.find((c) => (c.id));
        if (idField) {
            return idField.field;
        }

        return this.props.columns[0].field;
    }

    getIdValue(row) {
        if (!this.getIdField()) {
            return null;
        }

        return row[this.getIdField()];
    }

    //
    // Rendering
    //
    renderHeader() {
        const { HeaderCell } = this.props;
        return (
            <thead>
                <tr>
                    {
                        this.getVisibleColumns().map((col) => (
                            <HeaderCell column={ col }
                                    sorting={ this.props.sorting }
                                    onHeaderClick={ this.props.onHeaderClick }
                                    key={ col.field } />
                        ))
                    }
                </tr>
            </thead>
        );
    }

    renderBody() {
        const visible = this.getVisibleColumns();
        return (
            <tbody>
                {
                    this.props.data.map((row) => {
                        // If the dev avoids/misses using the `field` and `id`
                        // attributes on all columns, the resulting `null` value
                        // returned by `row[this.getIdField()]` would result in
                        // react collapsing all rows into one. The random string
                        // per row avoids that issue as a fallback.
                        const id = this.getIdValue(row) || Math.random().toString(36).substring(7);
                        return (
                            <tr key={ id } onClick={ this.props.onRowClick }>
                                {
                                    visible.map((col) => (
                                        <td key={ id + (col.field) }>
                                            { col.render ? col.render(row) : row[col.field] }
                                        </td>
                                    ))
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    }

    renderNoDataMessage() {
        if (this.props.data && this.props.data.length > 0) {
            return undefined;
        }
        return (
            <tbody>
                <tr>
                    <td colSpan={ this.getVisibleColumns().length }>
                        <div className={ this.props.classNames.noDataClass }>
                            Nothing to see here!
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    render() {
        const {
            data,
            columns,
            sorting,

            onRowClick,
            onHeaderClick,

            classNames,
            HeaderCell,
            ...rest
        } = this.props;

        return (
            <table { ...rest }>
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderNoDataMessage() }
            </table>
        );
    }
}
