import PropTypes from 'prop-types';

export const columnProp = PropTypes.shape({
    /**
     * The field name or path, used to find data in the set
     */
    field: PropTypes.string.isRequired,
    /**
     * The title of the field, as displayed in the table header
     */
    title: PropTypes.node.isRequired,
    /**
     * Is this column an identifying column?
     */
    id: PropTypes.bool,
    /**
     * A renderable which alters the way the value is displayed
     */
    render: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    /**
     * Whether or not the field should be sortable
     */
    sortable: PropTypes.bool,
    /**
     * Whether or not the field should be displayed
     */
    visible: PropTypes.bool
});
