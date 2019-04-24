import React from 'react';
import { storiesOf } from '@storybook/react';
import { Panel } from '../..';

storiesOf('Panel', module)
    .add('default', () => (
        <Panel>
            This is just a test!
        </Panel>
    ));
