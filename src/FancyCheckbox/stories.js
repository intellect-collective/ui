import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import FancyCheckbox from './index';

storiesOf('FancyCheckbox', module)
    .add('default', withState()(({ store }) => (
        <FancyCheckbox name="test-check-1"
        		value="hotdogs"
        		checked={ store.state['test-check-1'] }
        		onChange={ (ev) => (store.set({ [ev.target.name]: ev.target.checked })) }
        		classes="fancycheck-primary" />
    )));
