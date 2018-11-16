import React from 'react';
import { storiesOf } from '@storybook/react';
import width from '../../../../.storybook/decorators/width';
import stateful from '../../../../.storybook/decorators/stateful';
import { Field, StateControlledForm, Text } from '../../../..';

storiesOf('Molecules / Forms / StateControlledForm', module)
    .addDecorator(stateful({}, true))
    .addDecorator(width(200))
    .add('default', () => (onChange, state, stateful) => (
        <div>
            <div className="card">
                <div className="card-title">Source</div>
                <div className="card-body">
                    <Text name="test" onChange={ (ev) => { onChange(ev.target.name, ev.target.value); } } />
                </div>
            </div>

            <div className="card">
                <div className="card-title">StateControlledForm</div>
                <div className="card-body">
                    <StateControlledForm action="/" values={{ test: state.test }} ref={ stateful.setChildRef }>
                        <Text name="test" />
                        <Field name="test">
                            { ({ getConflict }) => {
                                if (getConflict()) {
                                    return (<p>Unreconciled: { getConflict() }</p>);
                                }
                                return null;
                            } }
                        </Field>
                    </StateControlledForm>
                </div>
            </div>
        </div>
    ));
