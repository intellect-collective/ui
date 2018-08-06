import React from 'react';
import { storiesOf } from '@storybook/react';
import stateful from '../../../../.storybook/decorators/stateful';
import FancyCheckbox from './index';

storiesOf('Atoms / Forms / FancyCheckbox', module)
    .addDecorator(stateful())
    .add('default', () => (onChange) => {
        return (<FancyCheckbox name="test-check-1" value="hotdogs" onClick={ (ev) => (onChange(ev.target.name, ev.target.checked)) } />);
    });
