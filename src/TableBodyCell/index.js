import React from 'react';
import PropTypes from 'prop-types';
import { columnProp } from '../utils/prop-types';

const TableBodyCell = ({
    column: { render, field },
    row,
    idField,
    ...rest
}) => (
    <td key={ row[idField] + field } { ...rest }>
        { render ? render(row) : row[field] }
    </td>
);
TableBodyCell.displayName = 'TableBodyCell';
TableBodyCell.propTypes = {
    column: columnProp,
    row: PropTypes.object,
    idField: PropTypes.string
};
export default TableBodyCell;
