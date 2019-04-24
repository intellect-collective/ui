import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../..';
import width from '../../.storybook/decorators/width';
import stateful from '../../.storybook/decorators/stateful';

storiesOf('Select', module)
    .addDecorator(stateful())
    .addDecorator(width(200))
    .add('default', () => (onChange, state) => (
        <Select name="actors"
                value={ state.actors }
                onChange={ (ev) => { onChange(ev.target.name, ev.target.value); } }>
            <option value="jackie">Jackie Chan</option>
            <option value="jet">Jet Li</option>
            <option value="tony">Tony Jaa</option>
        </Select>
    ))
    .add('multiple', () => (onChange, state) => (
        <Select name="actors"
                value={ state.actors }
                onChange={ (ev, value) => { onChange(ev.target.name, value || ev.target.value); } }
                multiple>
            <option value="jackie">Jackie Chan</option>
            <option value="jet">Jet Li</option>
            <option value="tony">Tony Jaa</option>
        </Select>
    ));
