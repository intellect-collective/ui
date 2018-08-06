import React from 'react';
import { storiesOf } from '@storybook/react';
import FieldGroup from './index';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import stateful from '../../../../.storybook/decorators/stateful';

storiesOf('Atoms / Forms / FieldGroup', module)
    .addDecorator(stateful())
    .add('radio buttons', () => (onChange, state) => (
        <FieldGroup name="test" value={ state.test } onChange={ onChange }>
            First
            {' '}
            <Radio value="first" />
            <br />
            Second
            {' '}
            <Radio value="second" />
            <br />
            Third
            {' '}
            <Radio value="third" />
        </FieldGroup>
    ))
    .add('checkboxes', () => (onChange, state) => (
        <FieldGroup name="test" value={ state.test } multiple onChange={ onChange }>
            First
            {' '}
            <Checkbox value="first" />
            <br />
            Second
            {' '}
            <Checkbox value="second" />
            <br />
            Third
            {' '}
            <Checkbox value="third" />
        </FieldGroup>
    ));
