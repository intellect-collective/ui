import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Password from './index';

storiesOf('Atoms / Forms / Password', module)
    .add('default', () => (<Password name="test-pass-1" onChange={ action('onChange') } />));
