import React from 'react';
import { orderBy } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
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
        onChange({ sorting: undefined });
    } else {
        onChange({ sorting: dir + col });
    }
};

storiesOf('2 - Components / DataTable', module)
    .addDecorator(style(`
        .style-wrapper {
            width: 768px;
        }
        table {
            width: 100%;
        }
    `))
    .add('plain', withState()((store) => (
        <DataTable data={ getData(store.state) }
                columns={ columns }
                sorting={ store.state.sorting }
                onHeaderClick={ onHeaderClick(store.set) } />
    )))
    .add('no data', () => (
        <DataTable data={ [] } columns={ columns } />
    ))
    .add('with class name', withState()((store) => (
        <DataTable data={ getData(store.state) }
                columns={ columns }
                sorting={ store.state.sorting }
                onHeaderClick={ onHeaderClick(store.set) }
                className="basic" />
    )))
    .add('clickable rows', withState()((store) => (
        <DataTable data={ getData(store.state) }
                columns={ columns }
                sorting={ store.state.sorting }
                onHeaderClick={ onHeaderClick(store.set) }
                onRowClick={ action('onRowClick') }
                className="basic" />
    )));
