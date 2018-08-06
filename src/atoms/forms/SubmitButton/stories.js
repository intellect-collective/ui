import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SubmitButton from './index';

storiesOf('Atoms / Forms / SubmitButton', module)
    .add('default', () => (<SubmitButton name="test-submit-1" onClick={ action('onClick') }>Save</SubmitButton>));
