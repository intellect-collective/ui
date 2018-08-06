import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Text from './index';

storiesOf('Atoms / Forms / Text', module)
    .add('default', () => (<Text name="test-text-1" onChange={ action('onChange') } />));
