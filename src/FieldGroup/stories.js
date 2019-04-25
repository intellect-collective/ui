import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import FieldGroup from './index';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

storiesOf('FieldGroup', module)
    .add('radio buttons', withState({ initialState: {} })(({ store }) => (
        <FieldGroup name="test" value={ store.state.test } onChange={ (ev) => store.set({ [ev.target.name]: ev.target.value }) }>
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
    )))
    .add('checkboxes', withState({})(({ store }) => (
        <FieldGroup name="test" value={ store.state.test } multiple onChange={ store.set }>
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
    )));
