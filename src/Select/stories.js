import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { Select } from '../..';
import width from '../../.storybook/decorators/width';

storiesOf('Select', module)
    .addDecorator(width(200))
    .add('default', withState()(({ store }) => (
        <Select name="actors"
                value={ store.state.actors }
                onChange={ (ev) => { store.set({ [ev.target.name]: ev.target.value }) } }>
            <option value="jackie">Jackie Chan</option>
            <option value="jet">Jet Li</option>
            <option value="tony">Tony Jaa</option>
        </Select>
    )))
    .add('multiple', withState()(({ store }) => (
        <Select name="actors"
                value={ store.state.actors }
                onChange={ (ev, value) => { store.set({ [ev.target.name]: value || ev.target.value }) } }
                multiple>
            <option value="jackie">Jackie Chan</option>
            <option value="jet">Jet Li</option>
            <option value="tony">Tony Jaa</option>
        </Select>
    )));
