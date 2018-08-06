import React from 'react';
import Select from '.';
import Form from '../Form';
import {
    getMissingFieldError
} from '../../../../test/utils';

const options = {
    hotdogs: 'Hotdogs',
    sausages: 'Sausages',
    burgers: 'Burgers'
};

const validProps = {
    options,
    name: 'test',
    value: 'sausages',
    onChange: () => {},
    required: true
};

describe('Select', () => {
    describe('Basics', () => {
        it('Should throw an error on missing name', () => {
            expect(() => {
                mount(<Select />);
            }).toThrowError(getMissingFieldError('name'));
        });

        it('Should accept valid props', () => {
            const wrapper = mount(<Select { ...validProps } required />);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('select').prop('name')).toEqual('test');
            expect(wrapper.find('option').length).toEqual(3);
            expect(wrapper.find('option[value="sausages"]').getDOMNode().selected).toEqual(true);
        });

        it('Clicking without handler is no-op', () => {
            const wrapper = mount(<Select { ...validProps } />);
            wrapper.find('select').simulate('change');
        });

        it('Clicking with handler supplies name and event', () => {
            const fn = jest.fn();
            const wrapper = mount(<Select { ...validProps } onChange={ fn } />);
            wrapper.find('select').simulate('change');
            expect(fn).toHaveBeenCalledWith(expect.objectContaining({
                target: expect.objectContaining({
                    name: validProps.name,
                    value: validProps.value
                })
            }));
        });
    });

    describe('Form Context Usage', () => {
        it('Gets checked state from form', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Select name="test" options={ options } required />
                </Form>
            );
            expect(wrapper.find('select').prop('name')).toEqual('test');
            expect(wrapper.find('option').length).toEqual(3);
            expect(wrapper.find('option[value="sausages"]').getDOMNode().selected).toEqual(true);
        });

        it('Prefers local attributes over form attributes', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'sausages' }}>
                    <Select name="test" options={ options } value="burgers" required />
                </Form>
            );
            expect(wrapper.find('select').prop('name')).toEqual('test');
            expect(wrapper.find('option').length).toEqual(3);
            expect(wrapper.find('option[value="sausages"]').getDOMNode().selected).toEqual(false);
            expect(wrapper.find('option[value="burgers"]').getDOMNode().selected).toEqual(true);
        });

        it('Remains unchecked if form field has incorrect value', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'streetmeat' }}>
                    <Select name="test" options={ options } required />
                </Form>
            );
            expect(wrapper.find('select').prop('value')).toEqual('streetmeat');
        });

        it('Can check multiple', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: ['hotdogs', 'sausages'] }}>
                    <Select name="test" options={ options } multiple required />
                </Form>
            );
            expect(wrapper.find('option[value="sausages"]').getDOMNode().selected).toEqual(true);
            expect(wrapper.find('option[value="hotdogs"]').getDOMNode().selected).toEqual(true);
        });
    });
});
