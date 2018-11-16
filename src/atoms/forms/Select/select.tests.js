import React from 'react';
import { Form, Select } from '../../../..';

describe('Form Components - Select', () => {
    describe('Basics', () => {
        it('Clicking without handler is no-op', () => {
            const wrapper = mount(
                <Select name="test">
                    <option value="first">First</option>
                </Select>
            );
            wrapper.find('select').simulate('change');
        });

        it('Clicking with handler supplies name and event', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <Select name="test" onChange={ fn }>
                    <option value="first">First</option>
                </Select>
            );
            wrapper.find('option').simulate('change');
            expect(fn).toHaveBeenCalled();
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    value: 'first'
                }
            });
            expect(fn.mock.calls[0][1]).toEqual('first');
        });

        it('Can check multiple', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <Select name="test" value={ ['first', 'second'] } onChange={ fn } multiple>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                </Select>
            );
            expect(wrapper.find('option[value="first"]').getDOMNode().selected).toEqual(true);
            expect(wrapper.find('option[value="second"]').getDOMNode().selected).toEqual(true);
            wrapper.find('option[value="third"]').simulate('change', {
                target: {
                    selectedOptions: [
                        { value: 'first' },
                        { value: 'second' },
                        { value: 'third' }
                    ]
                }
            });
            expect(fn).toHaveBeenCalled();
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    selectedOptions: [
                        { value: 'first' },
                        { value: 'second' },
                        { value: 'third' }
                    ]
                }
            });
            expect(fn.mock.calls[0][1]).toIncludeSameMembers(['first', 'second', 'third']);
        });
    });

    describe('Form Context Usage', () => {
        const handler = (data) => ({
            getValue() {
                return data;
            }
        });

        it('Gets selected state from form', () => {
            const wrapper = mount(
                <Form action="/" handler={ handler('second') }>
                    <Select name="test">
                        <option value="first">First</option>
                        <option value="second">Second</option>
                    </Select>
                </Form>
            );
            expect(wrapper.find('option[value="second"]').getDOMNode().selected).toEqual(true);
        });

        it('Prefers local value over form context value', () => {
            const wrapper = mount(
                <Form action="/" handler={ handler('second') }>
                    <Select name="test" value="third">
                        <option value="first">First</option>
                        <option value="second">Second</option>
                        <option value="third">Third</option>
                    </Select>
                </Form>
            );
            expect(wrapper.find('option[value="first"]').getDOMNode().selected).toEqual(false);
            expect(wrapper.find('option[value="second"]').getDOMNode().selected).toEqual(false);
            expect(wrapper.find('option[value="third"]').getDOMNode().selected).toEqual(true);
        });

        it('Can initialize with multiple checked', () => {
            const wrapper = mount(
                <Form action="/" handler={ handler(['first', 'second']) }>
                    <Select name="test" multiple>
                        <option value="first">First</option>
                        <option value="second">Second</option>
                        <option value="third">Third</option>
                    </Select>
                </Form>
            );
            expect(wrapper.find('option[value="first"]').getDOMNode().selected).toEqual(true);
            expect(wrapper.find('option[value="second"]').getDOMNode().selected).toEqual(true);
            expect(wrapper.find('option[value="third"]').getDOMNode().selected).toEqual(false);
        });
    });
});
