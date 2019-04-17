import React from 'react';

export default ({ column: { render, field }, row, idField, ...rest }) => (
    <td key={ row[idField] + field } { ...rest }>
        { render ? render(row) : row[field] }
    </td>
);
