import React from 'react';
import PropTypes from 'prop-types';
import TableBodyCell from '../TableBodyCell';
import { columnProp } from '../prop-types';

const TableBody = ({
    cell: Cell,
    data,
    columns,
    idField,
    onRowClick
}) => {
    if (!data || data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={ columns.length }>
                        <div className="no-data">
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
                data.map((row) => (
                    <tr key={ row[idField] } onClick={ onRowClick }>
                        {
                            columns.map((col) => (
                                <Cell column={ col }
                                        idField={ idField }
                                        row={ row }
                                        key={ idField + col.field }
                                        className={ col.bodyClasses } />
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    );
};
TableBody.displayName = 'TableBody';
TableBody.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(columnProp),
    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    idField: PropTypes.string,
    onRowClick: PropTypes.func
};
TableBody.defaultProps = {
    cell: TableBodyCell
};
export default TableBody;
