import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './index';

storiesOf('Atoms / Forms / Button', module)
    .add('with name', () => (
        <Button type="submit" name="test-button-1" onClick={ action('onClick') } className="btn">Test</Button>
    ))
    .add('with name and id', () => (
        <Button type="submit" name="test-button-1" id="test-button-2" onClick={ action('onClick') } className="btn">Test</Button>
    ));
