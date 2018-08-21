import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const numeric = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

export default class Pagination extends React.Component {
    static propTypes = {
        page: numeric.isRequired,
        pageSize: numeric.isRequired,
        rows: numeric.isRequired,
        buffer: numeric,
        sorting: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                asc: PropTypes.bool
            })
        ),

        generateUri: PropTypes.func,
        onPageChange: PropTypes.func
    };

    static defaultProps = {
        buffer: 4,
        generateUri: () => {},
        onPageChange: () => {}
    };

    constructor() {
        super();
        this.onPageChange = this.onPageChange.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.render = this.render.bind(this);
    }

    onPageChange(page, pageSize) {
        return (ev) => {
            this.props.onPageChange(page, pageSize, ev);
        };
    }

    renderItem(page, value, classNames, key) {
        return (
            <li className={ classNames } key={ key }>
                <a href={ this.props.generateUri(
                    page,
                    Number(this.props.pageSize),
                    Number(this.props.sorting)
                ) }
                        onClick={ this.onPageChange(page, Number(this.props.pageSize)) }>
                    { value }
                </a>
            </li>
        );
    }

    render() {
        const rows = Number(this.props.rows);
        const totalPages = Math.ceil(rows / Number(this.props.pageSize));
        const currentPage = Number(this.props.page);
        const buffer = Number(this.props.buffer);

        const startPage = Math.max(1, currentPage - Number(buffer));
        const endPage = Math.min(totalPages, currentPage + buffer);
        const previousPage = Math.max(1, currentPage - 1);
        const nextPage = Math.min(totalPages, currentPage + 1);

        const pages = [];

        pages.push(this.renderItem(1, 'First', (currentPage === 1 ? 'disabled' : ''), 'first'));
        pages.push(this.renderItem(previousPage, 'Previous', (currentPage === 1 ? 'disabled' : ''), 'prev'));

        // Generate numerical page buttons
        for (let i = startPage; i <= endPage; i++) {
            const classNames = classnames('waves-effect', { active: currentPage === i });
            pages.push(this.renderItem(i, i, classNames, i));
        }

        pages.push(this.renderItem(nextPage, 'Next', (currentPage === totalPages ? 'disabled' : ''), 'next'));
        pages.push(this.renderItem(totalPages, 'Last', (currentPage === totalPages ? 'disabled' : ''), 'last'));

        // Generate the list
        return (
            <div>
                <ul className="pagination">
                    { pages }
                </ul>
                <div className="clearfix" />
                <small className="pagination-summary">Page { currentPage } of { totalPages } - { rows } rows total.</small>
            </div>
        );
    }
}
