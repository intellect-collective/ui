import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Textarea from './index';
import width from '../../../../.storybook/decorators/width';

storiesOf('Atoms / Forms / Textarea', module)
    .addDecorator(width(200))
    .add('default', () => (<Textarea name="test" placeholder="Test..." onChange={ action('onChange') } />));
