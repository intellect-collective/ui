import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderCell from '../TableHeaderCell';
import { columnProp } from '../utils/prop-types';

const TableHeader = ({
    columns, sorting, onHeaderClick, cell: Cell
}) => {
    return (
        <thead>
            <tr>
                {
                    columns.map((col) => (
                        <Cell column={ col }
                                sorting={ sorting }
                                onHeaderClick={ onHeaderClick }
                                key={ col.field } />
                    ))
                }
            </tr>
        </thead>
    );
};
TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
    columns: PropTypes.arrayOf(columnProp),
    sorting: PropTypes.string,
    onHeaderClick: PropTypes.func,
    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
};
TableHeader.defaultProps = {
    cell: TableHeaderCell
};
export default TableHeader;
