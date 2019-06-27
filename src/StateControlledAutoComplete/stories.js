import React from 'react';
import { storiesOf } from '@storybook/react';
import width from '../../.storybook/decorators/width';
import { StateControlledAutoComplete } from '../..';
import data from '../../test/data/people.json';

const items = data.map((person) => ({
    title: `${ person.first_name } ${ person.last_name }`,
    value: person.email
}));

storiesOf('2 - Components / StateControlledAutoComplete', module)
    .addDecorator(width(200))
    .add('default', () => (
        <StateControlledAutoComplete name="person"
                items={ items }
                onSelect={ onChange } />
    ));
