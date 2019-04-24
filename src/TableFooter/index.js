import React from 'react';
import PropTypes from 'prop-types';
import { columnProp } from '../utils/prop-types';

const TableFooter = ({
    columns
}) => {
    return (
        <tfoot>
            <tr>
                <td colSpan={ columns.length } />
            </tr>
        </tfoot>
    );
};
TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = {
    columns: PropTypes.arrayOf(columnProp)
};
export default TableFooter;
