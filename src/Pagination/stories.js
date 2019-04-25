import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import Pagination from './index';

storiesOf('Pagination', module)
    .add('default', withState()(({ store }) => (
        <Pagination page={ store.state.page || 1 }
                pageSize={ store.state.pageSize || 25 }
                rows={ store.state.rows || 571 }
                buffer={ store.state.buffer || 3 }
                onPageChange={ (page) => { store.set({ page }); } } />
    )))
    .add('with buffer of 5', withState()(({ store }) => (
        <Pagination page={ store.state.page || 1 }
                pageSize={ store.state.pageSize || 25 }
                rows={ store.state.rows || 571 }
                buffer={ store.state.buffer || 5 }
                onPageChange={ (page) => { store.set({ page }); } } />
    )))
    .add('with page size of 50', withState()(({ store }) => (
        <Pagination page={ store.state.page || 1 }
                pageSize={ store.state.pageSize || 50 }
                rows={ store.state.rows || 571 }
                buffer={ store.state.buffer || 5 }
                onPageChange={ (page) => { store.set({ page }); } } />
    )));
