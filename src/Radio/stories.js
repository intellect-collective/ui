import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Radio from './index';

storiesOf('2 - Components / Form / Radio', module)
    .add('default', () => (
        <div>
Sausages:
            <Radio name="test-file-1" value="sausages" onChange={ action('onChange') } />
        </div>
    ));
