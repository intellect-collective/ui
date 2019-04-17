import React from 'react';
import { storiesOf } from '@storybook/react';
import OutsideClickWatcher from './index';

storiesOf('Atoms / OutsideClickWatcher', module)
    .add('default', () => (<OutsideClickWatcher><button>test</button></OutsideClickWatcher>));
