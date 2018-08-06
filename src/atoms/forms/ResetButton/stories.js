import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Resetbutton from './index';

storiesOf('Atoms / Forms / ResetButton', module)
    .add('default', () => (<Resetbutton name="test-reset-1" onClick={ action('onClick') }>Clear</Resetbutton>));
