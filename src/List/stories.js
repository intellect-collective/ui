import React from 'react';
import { storiesOf } from '@storybook/react';
import { List, ListItem } from '../..';

storiesOf('2 - Components / List', module)
    .add('default', () => (
        <List style={{ border: '1px solid #bbb' }}>
        	<ListItem>Test</ListItem>
        </List>
    ));
