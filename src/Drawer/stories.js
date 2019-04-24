import React from 'react';
import { storiesOf } from '@storybook/react';
import { Drawer, List, ListItem } from '../..';

const Menu = () => (
	<List>
		<ListItem><a href="#">Profile</a></ListItem>
		<ListItem><a href="#">Account</a></ListItem>

		<li className="divider" />

		<ListItem><a href="#">Emails</a></ListItem>
		<ListItem><a href="#">Notifications</a></ListItem>
		<ListItem><a href="#">Security</a></ListItem>
		<ListItem><a href="#">Sessions</a></ListItem>
	</List>
);

storiesOf('Drawer', module)
    .add('default', () => (
        <Drawer classes="docked anchor-left">
            <Menu />
        </Drawer>
    ));
