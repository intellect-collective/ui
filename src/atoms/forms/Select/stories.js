import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from './index';
import width from '../../../../.storybook/decorators/width';

const options = [
    {
        title: 'Jason Statham',
        value: 'jason'
    },
    {
        title: 'Jackie Chan',
        value: 'jackie'
    },
    {
        title: 'Terry Crews',
        value: { a: 1, b: 'test' }
    }
];

storiesOf('Atoms / Forms / Select', module)
    .addDecorator(width(200))
    .add('default', () => (<Select name="test-select-1" options={ options } value="jackie" onChange={ action('onChange') } />))
    .add('required', () => (<Select name="test-select-1" options={ options } value="jackie" onChange={ action('onChange') } required />))
    .add('optional with placeholder', () => (<Select name="test-select-1" options={ options } onChange={ action('onChange') } value="jackie" placeholder="Please Select..." />))
    .add('required with placeholder', () => (<Select name="test-select-1" options={ options } onChange={ action('onChange') } value="jackie" placeholder="Please Select..." required />))
    .add('multiple', () => (<Select name="test-select-1" options={ options } onChange={ action('onChange') } value={ ['jackie', 'jason'] } placeholder="Please Select..." multiple required />));
