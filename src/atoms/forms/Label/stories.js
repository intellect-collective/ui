import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './index';

storiesOf('Atoms / Forms / Label', module)
    .add('default', () => (
        <Label>
Test
        </Label>
    ));
