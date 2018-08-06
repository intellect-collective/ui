import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateField from './index';

storiesOf('Atoms / Forms /DateField', module)
    .add('default', () => (<DateField name="test-date-1" value="2015-10-16" onChange={ action('onChange') } />));
