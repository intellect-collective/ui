import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './index';

storiesOf('2 - Components / Form / Checkbox', module)
    .add('default', () => (<Checkbox name="test-check-1" value="hotdogs" onClick={ action('onClick') } />));
