import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Atoms / Forms /Checkbox', module)
    .add('default', () => (<Checkbox name="test-check-1" value="hotdogs" />));
