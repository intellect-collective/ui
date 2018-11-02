import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toggle } from '../../../..';
import width from '../../../../.storybook/decorators/width';

storiesOf('Atoms / Forms / Toggle', module)
    .addDecorator(width(200))
    .add('default', () => (
        <div>
            <Toggle name="first" />
            <Toggle className="toggle toggle-brand" name="second" />
            <Toggle className="toggle toggle-primary" name="third" />
            <Toggle className="toggle toggle-success" name="fourth" />
            <Toggle className="toggle toggle-info" name="fifth" />
            <Toggle className="toggle toggle-warning" name="sixth" />
            <Toggle className="toggle toggle-danger" name="seventh" />
        </div>
    ))
    .add('worded', () => (
        <div>
            <Toggle worded name="first" />
            <Toggle worded className="toggle toggle-brand" name="second" />
            <Toggle worded className="toggle toggle-primary" name="third" />
            <Toggle worded className="toggle toggle-success" name="fourth" />
            <Toggle worded className="toggle toggle-info" name="fifth" />
            <Toggle worded className="toggle toggle-warning" name="sixth" />
            <Toggle worded className="toggle toggle-danger" name="seventh" />
        </div>
    ))
    .add('oval', () => (
        <div>
            <Toggle oval name="first" />
            <Toggle oval className="toggle toggle-brand" name="second" />
            <Toggle oval className="toggle toggle-primary" name="third" />
            <Toggle oval className="toggle toggle-success" name="fourth" />
            <Toggle oval className="toggle toggle-info" name="fifth" />
            <Toggle oval className="toggle toggle-warning" name="sixth" />
            <Toggle oval className="toggle toggle-danger" name="seventh" />
        </div>
    ))
    .add('oval worded', () => (
        <div>
            <Toggle oval worded name="first" />
            <Toggle oval worded className="toggle toggle-brand" name="second" />
            <Toggle oval worded className="toggle toggle-primary" name="third" />
            <Toggle oval worded className="toggle toggle-success" name="fourth" />
            <Toggle oval worded className="toggle toggle-info" name="fifth" />
            <Toggle oval worded className="toggle toggle-warning" name="sixth" />
            <Toggle oval worded className="toggle toggle-danger" name="seventh" />
        </div>
    ));
