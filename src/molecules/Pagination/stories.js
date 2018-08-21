import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from './index';
import stateful from '../../../.storybook/decorators/stateful';

storiesOf('Molecules / Pagination', module)
    .addDecorator(stateful())
    .add('default', () => (onChange, state) => (
        <Pagination page={ state.page || 1 }
                pageSize={ state.pageSize || 25 }
                rows={ state.rows || 571 }
                buffer={ state.buffer || 3 }
                onPageChange={ (page) => { onChange('page', page); } } />
    ))
    .add('with buffer of 5', () => (onChange, state) => (
        <Pagination page={ state.page || 1 }
                pageSize={ state.pageSize || 25 }
                rows={ state.rows || 571 }
                buffer={ state.buffer || 5 }
                onPageChange={ (page) => { onChange('page', page); } } />
    ))
    .add('with page size of 50', () => (onChange, state) => (
        <Pagination page={ state.page || 1 }
                pageSize={ state.pageSize || 50 }
                rows={ state.rows || 571 }
                buffer={ state.buffer || 5 }
                onPageChange={ (page) => { onChange('page', page); } } />
    ));
