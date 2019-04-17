import React from 'react';
import PropTypes from 'prop-types';
import TableBodyCell from '../TableBodyCell';
import { columnProp } from '../prop-types';

export default class TableBody extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        columns: PropTypes.arrayOf(columnProp),
        cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
        idField: PropTypes.string
    };

    static defaultProps = {
        cell: TableBodyCell
    };

    render() {
        const { cell: Cell } = this.props;

        if (!this.props.data || this.props.data.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={ this.props.columns.length }>
                            <div className={ this.props.classNames.noDataClass }>
                                Nothing to see here!
                            </div>
                        </td>
                    </tr>
                </tbody>
            );
        }

        return (
            <tbody>
                {
                    this.props.data.map((row) => (
                        <tr key={ row[this.props.idField] } onClick={ this.props.onRowClick }>
                            {
                                this.props.columns.map((col) => (
                                    <Cell column={ col } idField={ this.props.idField } row={ row } key={ this.props.idField + col.field } className={ col.bodyClasses } />
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        );
    }
}
