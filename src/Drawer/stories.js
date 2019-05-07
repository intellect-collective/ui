import React from 'react';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
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

const ref = React.createRef();

const set = (store, update) => {
	if (update.anchor !== store.state.anchor && store.state.open) {
		store.set({ open: false });

        ref.current.addEventListener('transitionend', function f(e) {
            ref.current.removeEventListener('transitionend', f);
            store.set({ anchor: update.anchor });
            setTimeout(() => {
	            requestAnimationFrame(() => {
	            	requestAnimationFrame(() => {
	            		store.set({ ...update, open: true });
	            	})
	            }),
	            250
            })

        });
	} else {
		store.set(update)
	}
}

storiesOf('Drawer', module)
    .add('default', withState({ anchor: 'anchor-left' })(({ store }) => (
    	<div>
	        <Drawer classes={ classnames('docked', store.state.anchor, { open: store.state.open }) } open ref={ ref }>
	            <Menu />
	        </Drawer>
	        <button className="btn btn-primary" onClick={ () => { set(store, { anchor: 'anchor-left', open: !store.state.open }) } }>Left</button>
	        <button className="btn btn-primary" onClick={ () => { set(store, { anchor: 'anchor-top', open: !store.state.open }) } }>Top</button>
	        <button className="btn btn-primary" onClick={ () => { set(store, { anchor: 'anchor-right', open: !store.state.open }) } }>Right</button>
	        <button className="btn btn-primary" onClick={ () => { set(store, { anchor: 'anchor-bottom', open: !store.state.open }) } }>Bottom</button>
        </div>
    )));
