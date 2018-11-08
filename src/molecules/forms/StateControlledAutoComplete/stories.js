import React from 'react';
import { storiesOf } from '@storybook/react';
import width from '../../../../.storybook/decorators/width';
import stateful from '../../../../.storybook/decorators/stateful';
import { Form, StateControlledAutoComplete } from '../../../..';
import data from '../../../../test/data/people.json';

const items = data.map((person) => ({
    title: `${ person.first_name } ${ person.last_name }`,
    value: person.email
}));

storiesOf('Molecules / Forms / StateControlledAutoComplete', module)
    .addDecorator(stateful({}))
    .addDecorator(width(200))
    .add('default', () => (onChange, state, stateful) => (
        <Form action="/" data={ state } onChange={ (ev) => { onChange(ev.target.name, ev.target.value); } }>
            <StateControlledAutoComplete name="person"
                    items={ items }
                    onSelect={ onChange }
                    state={{ data: state, set: stateful.childSetState }} />
        </Form>
    ));
