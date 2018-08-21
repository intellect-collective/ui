import React from 'react';
import { storiesOf } from '@storybook/react';
import stateful from '../../../.storybook/decorators/stateful';
import PageOverlay from './index';

storiesOf('Atoms / PageOverlay', module)
    .addDecorator(stateful())
    .add('default', () => (onChange, state) => (
        <div>
            <button onClick={ () => (onChange('open', true)) }>Open!</button>
            <PageOverlay onClose={ () => (onChange('open', false)) } visible={ state.open }>Hello, world!</PageOverlay>
        </div>
    ));
