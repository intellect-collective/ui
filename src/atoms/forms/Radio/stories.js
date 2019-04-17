import React from 'react';
import { storiesOf } from '@storybook/react';
import Radio from './index';

storiesOf('Atoms / Forms / Radio', module)
    .add('default', () => (
        <div>
			Sausages:
            <Radio name="test-file-1" value="sausages" />
        </div>
    ));
