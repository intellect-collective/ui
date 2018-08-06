import React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './index';
import Textarea from '../../../atoms/forms/Textarea';
import width from '../../../../.storybook/decorators/width';

const input = (
    <Textarea name="description" />
);

storiesOf('Molecules / Forms / Field', module)
    .addDecorator(width(200))
    .add('with child', () => (
        <Field label="Test" name="description">
            { input }
        </Field>
    ))
    .add('with component', () => (<Field label="Test" name="description" component={ Textarea } />))
    .add('with component + placeholder', () => (<Field label="Test" name="description" component={ Textarea } placeholder="Write stuff..." />))
    .add('without label', () => (<Field name="description" component={ Textarea } />))
    .add('with class name', () => (
        <Field label="Label" name="description" className="field error">
            { input }
        </Field>
    ));
