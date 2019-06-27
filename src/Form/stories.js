import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import {
    Checkbox, Field, Form, Password, Text
} from '../..';

class FormExample extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        onChange: PropTypes.func
    };

    render() {
        return (
            <Form action="/" method="post" data={ this.props.data } onChange={ this.props.onChange } onSubmit={ (data, ev) => { ev.preventDefault(); ev.stopPropagation(); action('onSubmit')(data); } } className="form-horizontal">
                <p>Sign in for a better experience.</p>
                <Field name="email"
                        label="Email"
                        placeholder="Email"
                        className="form-group"
                        classNames={{
                            label: 'col-lg-2 control-label',
                            wrapper: 'col-lg-10',
                            field: 'form-control'
                        }}
                        wrapper="div"
                        component={ Text } />
                <Field name="password"
                        label="Password"
                        placeholder="Password"
                        className="form-group"
                        classNames={{
                            label: 'col-lg-2 control-label',
                            wrapper: 'col-lg-10',
                            field: 'form-control'
                        }}
                        wrapper="div"
                        component={ Password } />
                <div className="form-group">
                    <div className="col-lg-offset-2 col-lg-10">
                        <div className="i-checks">
                            <label>
                                <div className="icheckbox_square-green" style={{ position: 'relative' }}>
                                    <input type="checkbox" style={{ position: 'absolute', opacity: '0' }} />
                                    <ins className="iCheck-helper"
                                            style={{
                                                position: 'absolute',
                                                top: '0%',
                                                left: '0%',
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                margin: '0px',
                                                padding: '0px',
                                                background: 'rgb(255, 255, 255)',
                                                border: '0px',
                                                opacity: '0'
                                            }} />
                                </div>
                                <i />
                                Remember me
                                <Checkbox name="remember" value="yes" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-lg-offset-2 col-lg-10">
                        <button type="submit" name="go" className="btn btn-sm btn-white">Sign In</button>
                    </div>
                </div>
            </Form>
        );
    }
}

storiesOf('2 - Components / Form', module)
    .add('default', withState()(({ store }) => (<FormExample action="/" data={ store.state } onChange={ (ev) => store.set({ [ev.target.name]: ev.target.value}) } />)));
