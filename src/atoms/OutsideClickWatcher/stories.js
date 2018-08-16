import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import OutsideClickWatcher from './index';

storiesOf('Atoms / OutsideClickWatcher', module)
    .add('default', () => (<OutsideClickWatcher onClick={ action('onClick') }><button>test</button></OutsideClickWatcher>));
