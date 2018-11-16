import React from 'react';
import { Field, StateControlledForm, Text } from '../../../..';

describe('Form Components - StateControlledForm', () => {
    it('Can render', () => {
        const wrapper = mount(
            <StateControlledForm action="/" values={{ test: 'hotdogs' }}>
                <Text name="test" />
            </StateControlledForm>
        );
        expect(wrapper.find('input').length).toEqual(1);
        expect(wrapper.find('input').prop('value')).toEqual('hotdogs');
    });

    it('Retrieves empty values from empty state', () => {
        let original;
        let lastValue;
        let value;
        let touched;
        let dirty;
        let conflict;
        let error;

        mount(
            <StateControlledForm action="/">
                <Field name="test">
                    { (ctx) => {
                        original = ctx.getOriginal();
                        lastValue = ctx.getLastValue();
                        value = ctx.getValue();
                        touched = ctx.isTouched();
                        dirty = ctx.isDirty();
                        conflict = ctx.getConflict();
                        error = ctx.getError();
                        return (
                            <div />
                        );
                    } }
                </Field>
            </StateControlledForm>
        );

        expect(original).toEqual(undefined);
        expect(lastValue).toEqual(undefined);
        expect(value).toEqual(undefined);
        expect(touched).toEqual(false);
        expect(dirty).toEqual(false);
        expect(conflict).toEqual(undefined);
        expect(error).toEqual(undefined);
    });

    it('Retrieves empty values from full state', () => {
        let original;
        let lastValue;
        let value;
        let touched;
        let dirty;
        let conflict;

        mount(
            <StateControlledForm action="/" values={{ test: 'hotdogs' }}>
                <Field name="test">
                    { (ctx) => {
                        original = ctx.getOriginal();
                        lastValue = ctx.getLastValue();
                        value = ctx.getValue();
                        touched = ctx.isTouched();
                        dirty = ctx.isDirty();
                        conflict = ctx.getConflict();
                        return (
                            <div />
                        );
                    } }
                </Field>
            </StateControlledForm>
        );

        expect(original).toEqual('hotdogs');
        expect(lastValue).toEqual('hotdogs');
        expect(value).toEqual('hotdogs');
        expect(touched).toEqual(false);
        expect(dirty).toEqual(false);
        expect(conflict).toEqual(undefined);
    });

    it('Can update value', () => {
        const wrapper = mount(
            <StateControlledForm action="/" values={{ test: 'hotdogs' }}>
                <Text name="test" />
            </StateControlledForm>
        );
        wrapper.find('input').simulate('change', {
            target: {
                name: 'test',
                value: 'sausages'
            }
        });
        expect(wrapper.find('input').prop('value')).toEqual('sausages');
    });

    it('Focusing field sets touched flag', () => {
        const wrapper = mount(
            <StateControlledForm action="/">
                <Text name="test" />
            </StateControlledForm>
        );
        wrapper.find('input').simulate('focus');
        expect(wrapper.state().touched).toEqual(['test']);
    });

    it('Can set error', () => {
        const wrapper = mount(
            <StateControlledForm action="/" values={{ test: 'hotdogs' }}>
                <Field name="test">
                    { (ctx) => (
                        <button onClick={ () => { ctx.setError('Failed'); } }>Do Not Click!</button>
                    ) }
                </Field>
            </StateControlledForm>
        );
        wrapper.find('button').simulate('click');
        expect(wrapper.state().errors).toMatchObject({
            test: 'Failed'
        });
    });

    it('Reset form state', () => {
        const wrapper = mount(
            <StateControlledForm action="/" values={{ test: 'hotdogs' }}>
                <Text name="test" />
                <button type="reset">Do Not Click!</button>
            </StateControlledForm>
        );
        wrapper.find('input').simulate('change', {
            target: {
                name: 'test',
                value: 'sausages'
            }
        });
        expect(wrapper.state().values.test).toEqual('sausages');
        wrapper.find('form').simulate('reset');
        expect(wrapper.state().values.test).toEqual('hotdogs');
    });
});
