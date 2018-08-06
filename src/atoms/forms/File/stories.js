import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import File from './index';

storiesOf('Atoms / Forms / File', module)
    .add('default', () => (<File name="test-file-1" onChange={ action('onChange') } />));
