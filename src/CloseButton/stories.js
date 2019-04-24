import React from 'react';
import { storiesOf } from '@storybook/react';
import { CloseButton } from '../..';

storiesOf('CloseButton', module)
    .add('default', () => (
    	<CloseButton />
    ));
