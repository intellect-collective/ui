import React from 'react';
import { storiesOf } from '@storybook/react';
import stateful from '../../../../.storybook/decorators/stateful';
import { FancyCheckbox, Form } from '../../../..';
console.log('Fancy: ', FancyCheckbox);

storiesOf('Atoms / Forms / FancyCheckbox', module)
    .addDecorator(stateful({
    }))
    .add('default', () => (onChange) => {
        return (<FancyCheckbox name="test-check-1" value="hotdogs" onClick={ (ev) => (onChange(ev.target.name, ev.target.checked)) } />);
    })
    .add('in form', () => (onChange, state, stateful) => {
    	return (
            <Form action="#"
                    method="post"
                    data={ state }
                    onChange={ (ev) => {
                    	onChange(ev.target.name, ev.target.value)
                    } }
                    className="pregnancy-edit quiet">
                <FancyCheckbox name="test-check-1"
                		value="hotdogs" />
    		</Form>
		);
    });
