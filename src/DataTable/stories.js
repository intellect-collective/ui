import React from 'react';
import { orderBy } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import stateful from '../../.storybook/decorators/stateful';
import style from '../../.storybook/decorators/style';
import { DataTable } from '../..';
import data from '../../test/data/people.json';
import { getSort } from '../utils';

const columns = [
    { title: 'ID', field: 'id' },
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Email', field: 'email' },
    { title: 'Gender', field: 'gender' }
];

const getData = (state = {}) => {
    let items = data.slice();
    if (state.sorting) {
        const [col, dir] = getSort(state.sorting);
        if (col) {
            items = orderBy(items, [col], [dir === '-' ? 'desc' : 'asc']);
        }
    }
    return items.slice(0, 10);
};

const onHeaderClick = (onChange) => (col, dir) => {
    if (!dir) {
        onChange('sorting', undefined);
    } else {
        onChange('sorting', dir + col);
    }
};

storiesOf('DataTable', module)
    .addDecorator(stateful({ }))
    .addDecorator(style(`
        .style-wrapper {
            width: 768px;
        }
        table {
            width: 100%;
        }
    `))
    .add('plain', () => (onChange, state) => (
        <DataTable data={ getData(state) }
                columns={ columns }
                sorting={ state.sorting }
                onHeaderClick={ onHeaderClick(onChange) } />
    ))
    .add('no data', () => (
        <DataTable data={ [] } columns={ columns } />
    ))
    .add('with class name', () => (onChange, state) => (
        <DataTable data={ getData(state) }
                columns={ columns }
                sorting={ state.sorting }
                onHeaderClick={ onHeaderClick(onChange) }
                className="basic" />
    ))
    .add('clickable rows', () => (onChange, state) => (
        <DataTable data={ getData(state) }
                columns={ columns }
                sorting={ state.sorting }
                onHeaderClick={ onHeaderClick(onChange) }
                onRowClick={ action('onRowClick') }
                className="basic" />
    ));
