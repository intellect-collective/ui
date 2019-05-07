import React from 'react';
import { storiesOf } from '@storybook/react';
import { CloseButton } from '../../..';

storiesOf('Atoms / Close Button', module)
    .add('default', () => (
    	<CloseButton />
    ));
