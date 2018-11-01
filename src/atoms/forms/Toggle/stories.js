import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toggle } from '../../../..';
import width from '../../../../.storybook/decorators/width';

storiesOf('Atoms / Forms / Toggle', module)
    .addDecorator(width(200))
    .add('default', () => (
        <div>
            <Toggle name="first" />
            <Toggle className="toggle toggle-success" name="second" />
            <Toggle className="toggle toggle-info" name="third" />
            <Toggle className="toggle toggle-warning" name="fourth" />
            <Toggle className="toggle toggle-danger" name="fifth" />
        </div>
    ))
    .add('worded', () => (
        <div>
            <Toggle worded name="first" />
            <Toggle worded className="toggle toggle-success" name="second" />
            <Toggle worded className="toggle toggle-info" name="third" />
            <Toggle worded className="toggle toggle-warning" name="fourth" />
            <Toggle worded className="toggle toggle-danger" name="fifth" />
        </div>
    ))
    .add('oval', () => (
        <div>
            <Toggle oval name="first" />
            <Toggle oval className="toggle toggle-success" name="second" />
            <Toggle oval className="toggle toggle-info" name="third" />
            <Toggle oval className="toggle toggle-warning" name="fourth" />
            <Toggle oval className="toggle toggle-danger" name="fifth" />
        </div>
    ))
    .add('oval worded', () => (
        <div>
            <Toggle oval worded name="first" />
            <Toggle oval worded className="toggle toggle-success" name="second" />
            <Toggle oval worded className="toggle toggle-info" name="third" />
            <Toggle oval worded className="toggle toggle-warning" name="fourth" />
            <Toggle oval worded className="toggle toggle-danger" name="fifth" />
        </div>
    ));
