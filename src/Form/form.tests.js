import React from 'react';
import { Form } from '../..';

describe('Form', () => {
    it('Missing onSubmit does not produce error', () => {
        const wrapper = mount(
            <Form action="/">
                <input type="submit" />
            </Form>
        );
        wrapper.find('input').simulate('submit');
    });

    it('Form submit calls handler', () => {
        const fn = jest.fn();
        const wrapper = mount(
            <Form action="/" handler={{ onSubmit: fn }}>
                <input type="submit" name="test" />
            </Form>
        );
        wrapper.find('input').simulate('submit');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn.mock.calls[0][0]).toMatchObject({
            type: 'submit',
            target: {
                name: 'test'
            }
        });
    });

    it('Can set form encoding type', () => {
        const text = mount(<Form action="/" encType="text" />);
        expect(text.find('form').prop('encType')).toEqual('text/plain');
        const multipart = mount(<Form action="/" encType="multipart" />);
        expect(multipart.find('form').prop('encType')).toEqual('multipart/form-data');
    });

    it('Can set method to post', () => {
        const wrapper = mount(
            <Form action="/" method="post" />
        );
        expect(wrapper.find('form').prop('method')).toEqual('post');
    });

    it('Can set method to put', () => {
        const wrapper = mount(
            <Form action="/" method="put" overrideProperty="__method__" />
        );
        expect(wrapper.find('form').prop('method')).toEqual('post');
        expect(wrapper.find('input').prop('name')).toEqual('__method__');
        expect(wrapper.find('input').prop('value')).toEqual('put');
    });

    it('Can render component', () => {
        const fn = jest.fn(() => (<div />));
        mount(
            <Form action="/" component={ fn } />
        );
        expect(fn).toHaveBeenCalledTimes(1);
        expect(Object.keys(fn.mock.calls[0][0])).toIncludeSameMembers([
            'children',
            'getOriginal',
            'getLastValue',
            'getValue',
            'setValue',
            'getError',
            'setError',
            'isTouched',
            'setTouched',
            'isDirty',
            'getConflict'
        ]);
    });

    it('Can render function', () => {
        const fn = jest.fn(() => (<div />));
        mount(
            <Form action="/">{ fn }</Form>
        );
        expect(fn).toHaveBeenCalledTimes(1);
        expect(Object.keys(fn.mock.calls[0][0])).toIncludeSameMembers([
            'getOriginal',
            'getLastValue',
            'getValue',
            'setValue',
            'getError',
            'setError',
            'isTouched',
            'setTouched',
            'isDirty',
            'getConflict'
        ]);
    });
});
