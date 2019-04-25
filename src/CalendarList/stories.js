import React from 'react';
import update from 'immutability-helper';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { CalendarList } from '../..';

const calendars = [
    {
        id: 1,
        title: 'My Schedule',
        background: '#EDD197',
        color: 'black'
    },
    {
        id: 2,
        title: 'Patient Schedule',
        background: '#B0D80A'
    }
];

storiesOf('CalendarList', module)
    .add('default', withState({ calendars })(({ store }) => (
        <CalendarList calendars={ store.state.calendars }
                onChange={ (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    const idx = store.state.calendars.findIndex((c) => (c.id === ev.target.value));
                    const updated = update(store.state.calendars, {
                        [idx]: { hidden: { $set: !ev.target.checked } }
                    });
                    store.set({ calendars: updated });
                } } />
    )));
