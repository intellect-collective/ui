import React from 'react';
import { storiesOf } from '@storybook/react';
import width from '../../../../.storybook/decorators/width';
import stateful from '../../../../.storybook/decorators/stateful';
import { StateControlledAutoComplete } from '../../../..';
import data from '../../../../test/data/people.json';

const items = data.map((person) => ({
    title: `${ person.first_name } ${ person.last_name }`,
    value: person.email
}));

storiesOf('Molecules / Forms / StateControlledAutoComplete', module)
    .addDecorator(stateful({}))
    .addDecorator(width(200))
    .add('default', () => (onChange, state, stateful) => (
        <StateControlledAutoComplete name="person"
                items={ items }
                onSelect={ onChange }
                ref={ (ref) => { stateful.setChildRef(ref); } } />
    ));
