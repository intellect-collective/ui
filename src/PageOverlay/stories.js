import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import PageOverlay from './index';

storiesOf('PageOverlay', module)
    .add('default', withState()(( { store }) => (
        <div>
            <button onClick={ () => (store.set({ open: true })) }>Open!</button>
            <PageOverlay onClose={ () => (store.set({ open: false })) } visible={ store.state.open }>Hello, world!</PageOverlay>
        </div>
    )));
