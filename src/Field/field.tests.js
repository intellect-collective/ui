/* eslint-disable react/prop-types */

import React from 'react';
import { Field, FieldGroup, Form } from '../..';
import getWrapped from '../utils/getWrapped';

describe('Form Components - Field', () => {
    const fieldRender = getWrapped(Field).prototype.render;

    afterEach(() => {
        getWrapped(Field).prototype.render = fieldRender;
    });

    it('Field passes on context', () => {
        const fn = jest.fn(() => (<div />));
        mount(
            <Form action="/">
                <Field name="test" component={ fn } />
            </Form>
        );
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('Field can render regular input', () => {
        const wrapper = mount(
            <Form action="/">
                <Field name="test" component="input" />
            </Form>
        );
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('Field can get name from FieldGroup', () => {
        const wrapper = mount(
            <FieldGroup name="test">
                <Field component="input" />
            </FieldGroup>
        );
        expect(wrapper.find('input').prop('name')).toEqual('test');
    });

    it('Prefer explicit name over FieldGroup name', () => {
        const wrapper = mount(
            <FieldGroup name="test">
                <Field name="test2" component="input" />
            </FieldGroup>
        );
        expect(wrapper.find('input').prop('name')).toEqual('test2');
    });

    it('Prefer explicit value over Form value', () => {
        const wrapper = mount(
            <Form action="/" values={{ test: 'hello' }}>
                <Field name="test" component="input" value="world" />
            </Form>
        );
        expect(wrapper.find('input').prop('value')).toEqual('world');
    });

    it('Can retrieve form value', () => {
        const handler = {
            getValue: () => { return 'hello'; }
        };
        const wrapper = mount(
            <Form action="/" handler={ handler }>
                <Field name="test" component="input" />
            </Form>
        );
        expect(wrapper.find('input').prop('value')).toEqual('hello');
    });

    it('Change without handler is no-op', () => {
        const wrapper = mount(
            <Form action="/">
                <Field name="test" component="input" />
            </Form>
        );
        wrapper.find('input').simulate('change');
    });

    it('Will not update form value if propagation stopped', () => {
        const onChange = (ev) => {
            ev.stopPropagation();
        };
        const handler = {
            setValue: jest.fn()
        };
        const wrapper = mount(
            <Form action="/" handler={ handler }>
                <Field name="test" component="input" onChange={ onChange } />
            </Form>
        );
        wrapper.find('input').simulate('change');
        expect(handler.setValue).not.toHaveBeenCalled();
    });

    it('Will not update form value if context not set', () => {
        const wrapper = mount(
            <Form action="/">
                <Field name="test" component="input" />
            </Form>
        );
        wrapper.find('input').simulate('change');
    });

    it('Will not update form value if context.setValue not set', () => {
        const wrapper = mount(
            <Form action="/" handler={{}}>
                <Field name="test" component="input" />
            </Form>
        );
        wrapper.find('input').simulate('change');
    });

    it('Will update form value', () => {
        const handler = {
            setValue: jest.fn()
        };
        const wrapper = mount(
            <Form action="/" handler={ handler }>
                <Field name="test" component="input" />
            </Form>
        );
        wrapper.find('input').simulate('change');
        expect(handler.setValue).toHaveBeenCalledWith('test', '');
    });

    it('Passes field context to render function', () => {
        const fn = jest.fn(() => (<div />));
        mount(
            <Field name="test">
                { (ctx) => (fn(ctx)) }
            </Field>
        );
        expect(fn).toHaveBeenCalled();
        expect(fn.mock.calls[0][0]).toMatchObject({
            name: 'test'
        });
        expect(Object.keys(fn.mock.calls[0][0])).toIncludeSameMembers([
            'name',
            'getOriginal',
            'getLastValue',
            'getValue',
            'setValue',
            'getError',
            'setError',
            'getConflict',
            'isDirty',
            'isTouched',
            'setTouched'
        ]);
    });

    it('Can render normal children', () => {
        const wrapper = mount(
            <Field name="test">
                <input type="text" />
            </Field>
        );
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('Prefers custom value from component', () => {
        const fn = jest.fn();
        const handler = {
            setValue: jest.fn()
        };
        const component = (props) => (
            <input { ...props } onChange={ (ev) => (props.onChange(ev, 'blah')) } />
        );
        const wrapper = mount(
            <Form action="/" handler={ handler }>
                <Field name="test" component={ component } onChange={ fn } />
            </Form>
        );
        wrapper.find('input').simulate('change');
        expect(fn).toHaveBeenCalled();
        expect(fn.mock.calls[0][0]).toMatchObject({
            target: {
                name: 'test',
                value: ''
            }
        });
        expect(fn.mock.calls[0][1]).toEqual('blah');
        expect(handler.setValue).toHaveBeenCalled();
        expect(handler.setValue.mock.calls[0][0]).toEqual('test');
        expect(handler.setValue.mock.calls[0][1]).toEqual('blah');
    });

    it('Field context passes through to form context', () => {
        const handler = {
            getOriginal: jest.fn(),
            getLastValue: jest.fn(),
            getValue: jest.fn(),
            setValue: jest.fn(),
            getError: jest.fn(),
            setError: jest.fn(),
            isTouched: jest.fn(),
            setTouched: jest.fn(),
            isDirty: jest.fn(),
            getConflict: jest.fn()
        };
        mount(
            <Form action="/" handler={ handler }>
                <Field name="test">
                    { (ctx) => {
                        ctx.getOriginal();
                        ctx.getLastValue();
                        ctx.getValue();
                        ctx.setValue('sausages');
                        ctx.getError();
                        ctx.setError('hotdogs');
                        ctx.isTouched();
                        ctx.setTouched();
                        ctx.isDirty();
                        ctx.getConflict();
                        return (<div />);
                    } }
                </Field>
            </Form>
        );
        expect(handler.getOriginal).toHaveBeenCalledWith('test');
        expect(handler.getLastValue).toHaveBeenCalledWith('test');
        expect(handler.getValue).toHaveBeenCalledWith('test');
        expect(handler.setValue).toHaveBeenCalledWith('test', 'sausages');
        expect(handler.getError).toHaveBeenCalledWith('test');
        expect(handler.setError).toHaveBeenCalledWith('test', 'hotdogs');
        expect(handler.isTouched).toHaveBeenCalledWith('test');
        expect(handler.setTouched).toHaveBeenCalledWith('test');
        expect(handler.isDirty).toHaveBeenCalledWith('test');
        expect(handler.getConflict).toHaveBeenCalledWith('test');
    });
});
