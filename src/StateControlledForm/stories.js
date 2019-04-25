import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import width from '../../.storybook/decorators/width';
import { Field, StateControlledForm, Text } from '../..';

storiesOf('StateControlledForm', module)
    .addDecorator(width(200))
    .add('default', withState()(({ store }) => (
        <div>
            <div className="card">
                <div className="card-title">Source</div>
                <div className="card-body">
                    <Text name="test" onChange={ (ev) => { store.set({ [ev.target.name]: ev.target.value }); } } value={ store.state.test } />
                </div>
            </div>

            <div className="card">
                <div className="card-title">StateControlledForm</div>
                <div className="card-body">
                    <StateControlledForm action="/" values={{ test: store.state.test }}>
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
    )));
