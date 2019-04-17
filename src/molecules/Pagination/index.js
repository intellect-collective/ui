import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const numeric = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const Link = ({ page, pageSize, sorting, onClick, children }) => (
    <a onClick={ onClick }>
        { children }
    </a>
);

export default class Pagination extends React.Component {
    static propTypes = {
        page: numeric,
        pageSize: numeric,
        rows: numeric,
        buffer: numeric,
        sorting: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                asc: PropTypes.bool
            })
        ),

        link: PropTypes.func.isRequired,
        onPageChange: PropTypes.func
    };

    static defaultProps = {
        page: 0,
        pageSize: 0,
        rows: 0,
        buffer: 4,
        link: Link,
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
        const Link = this.props.link;
        return (
            <li className={ classNames } key={ key }>
                <Link page={ page }
                        pageSize={ this.props.pageSize }
                        sorting={ this.props.sorting }
                        onClick={ this.onPageChange(page, Number(this.props.pageSize)) }>
                    { value }
                </Link>
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
