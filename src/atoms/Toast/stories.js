import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast } from '../../..';

storiesOf('Atoms / Toast', module)
    .add('default', () => (
        <Toast title="The end of the world" time={ Date.now() - 11 * 60 } onClose={ () => {} } show>
            <p>In breaking news, the end of the world ocurred not too long ago. No word on why you're still here.</p>
        </Toast>
    ));
