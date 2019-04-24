import React from 'react';
import update from 'immutability-helper';
import { storiesOf } from '@storybook/react';
import stateful from '../../.storybook/decorators/stateful';
import { CalendarList } from '../..';

storiesOf('CalendarList', module)
    .addDecorator(stateful({
        calendars: [
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
        ]
    }))
    .add('default', () => (onChange, state, stateful) => (
        <CalendarList calendars={ state.calendars }
                onChange={ (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    const idx = state.calendars.findIndex((c) => (c.id === ev.target.value));
                    const updated = update(state.calendars, {
                        [idx]: { hidden: { $set: !ev.target.checked } }
                    });
                    stateful.setState({ calendars: updated });
                } } />));
