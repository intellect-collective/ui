import React from 'react';
import { Form } from '../..';

export default (Component, multiple = true) => {
    describe('Checkable Tests', () => {
        let fn;
        let setValue;
        let handler;

        beforeEach(() => {
            fn = jest.fn();
            setValue = jest.fn();
            handler = (data) => ({
                getValue() {
                    return data;
                },
                setValue
            });
        });

        describe('Without Form', () => {
            it('Should not throw error if not form-wrapped', () => {
                const wrapper = mount(
                    <Component name="test" />
                );
                wrapper.find('input').simulate('change');
            });

            it('Should act as boolean if no value given', () => {
                const wrapper = mount(
                    <Component name="test"
                            onChange={ fn } />
                );
                wrapper.find('input').simulate('change');
                expect(fn).toHaveBeenCalled();
                expect(fn.mock.calls[0][1]).toEqual(true);
            });

            it('Force boolean', () => {
                const wrapper = mount(
                    <Component name="test"
                            value="fire"
                            onChange={ fn }
                            boolean />
                );
                expect(wrapper.find('input').props().checked).toEqual(false);
                wrapper.find('input').simulate('change');
                expect(fn).toHaveBeenCalled();
                expect(fn.mock.calls[0][1]).toEqual(true);
            });

            it('Unchecking boolean sets value to false', () => {
                const wrapper = mount(
                    <Component name="test"
                            checked
                            onChange={ fn } />
                );
                expect(wrapper.find('input').props().checked).toEqual(true);
                wrapper.find('input').simulate('change');
                expect(fn).toHaveBeenCalled();
                expect(fn.mock.calls[0][1]).toEqual(false);
            });
        });

        describe('With Form', () => {
            it('Change calls form context handler amd explicit handler', () => {
                const wrapper = mount(
                    <Form action="/" handler={ handler() }>
                        <Component name="test" onChange={ fn } />
                    </Form>
                );
                wrapper.find('input').simulate('change');
                expect(fn).toHaveBeenCalled();
                expect(fn.mock.calls[0][0]).toMatchObject({
                    target: {
                        name: 'test'
                    }
                });
                expect(fn.mock.calls[0][1]).toEqual(true);
                expect(setValue).toHaveBeenCalled();
                expect(setValue.mock.calls[0]).toMatchObject(['test', true]);
            });

            it('Change can call only form context handler', () => {
                const wrapper = mount(
                    <Form action="/" handler={ handler() }>
                        <Component name="test" />
                    </Form>
                );
                wrapper.find('input').simulate('change');
                expect(setValue).toHaveBeenCalled();
                expect(setValue.mock.calls[0]).toMatchObject(['test', true]);
            });

            it('Change can call only explicit handler', () => {
                fn = jest.fn((ev) => { ev.stopPropagation(); });
                const wrapper = mount(
                    <Form action="/" handler={ handler() }>
                        <Component name="test" onChange={ fn } />
                    </Form>
                );
                wrapper.find('input').simulate('change');
                expect(fn.mock.calls[0][0]).toMatchObject({
                    target: {
                        name: 'test'
                    }
                });
                expect(fn.mock.calls[0][1]).toEqual(true);
                expect(setValue).not.toHaveBeenCalled();
            });

            it('Respects explicit checked state over form state', () => {
                const wrapper = mount(
                    <Form action="/" handler={ handler(true) }>
                        <Component name="test"
                                checked={ false }
                                boolean />
                    </Form>
                );
                expect(wrapper.find('input').props().checked).toEqual(false);
            });
        });

        if (multiple) {
            describe('Multiple selection', () => {
                it('Checking creates an array with value', () => {
                    const wrapper = mount(
                        <Component name="test"
                                value="fire"
                                onChange={ fn } />
                    );
                    expect(wrapper.find('input').props().checked).toEqual(false);
                    wrapper.find('input').simulate('change');
                    expect(fn).toHaveBeenCalled();
                    expect(fn.mock.calls[0][1]).toIncludeSameMembers(['fire']);
                });

                it('Unchecking creates array of values', () => {
                    const wrapper = mount(
                        <Component name="test"
                                value="fire"
                                checked
                                onChange={ fn } />
                    );
                    expect(wrapper.find('input').props().checked).toEqual(true);
                    wrapper.find('input').simulate('change');
                    expect(fn).toHaveBeenCalled();
                    expect(fn.mock.calls[0][1]).toEqual([]);
                });

                it('Checking adds to array of values', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler(['air']) }>
                            <Component name="test"
                                    value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input').props().checked).toEqual(false);
                    wrapper.find('input').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toIncludeSameMembers(['air', 'fire']);
                });

                it('Unchecking removes from array of values', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler(['air', 'fire']) }>
                            <Component name="test"
                                    value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input').props().checked).toEqual(true);
                    wrapper.find('input').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toEqual(['air']);
                });

                it('Can check multiple', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler('air') }>
                            <Component name="test" value="air" />
                            <Component name="test" value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input[value="air"]').props().checked).toEqual(true);
                    expect(wrapper.find('input[value="fire"]').props().checked).toEqual(false);
                    wrapper.find('input[value="fire"]').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toIncludeSameMembers(['air', 'fire']);
                });
            });
        } else {
            describe('Singular selection', () => {
                it('Checking results in string value', () => {
                    const wrapper = mount(
                        <Component name="test"
                                value="fire"
                                onChange={ fn } />
                    );
                    expect(wrapper.find('input').props().checked).toEqual(false);
                    wrapper.find('input').simulate('change');
                    expect(fn).toHaveBeenCalled();
                    expect(fn.mock.calls[0][1]).toEqual('fire');
                });

                it('Unchecking results in undefined value', () => {
                    const wrapper = mount(
                        <Component name="test"
                                value="fire"
                                checked
                                onChange={ fn } />
                    );
                    expect(wrapper.find('input').props().checked).toEqual(true);
                    wrapper.find('input').simulate('change');
                    expect(fn).toHaveBeenCalled();
                    expect(fn.mock.calls[0][1]).toEqual(null);
                });

                it('Checking results in string value', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler(['air']) }>
                            <Component name="test"
                                    value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input').props().checked).toEqual(false);
                    wrapper.find('input').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toEqual('fire');
                });

                it('Unchecking results in undefined value', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler(['air', 'fire']) }>
                            <Component name="test"
                                    value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input').props().checked).toEqual(true);
                    wrapper.find('input').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toEqual(null);
                });

                it('Cannot check multiple', () => {
                    const wrapper = mount(
                        <Form action="/" handler={ handler('air') }>
                            <Component name="test" value="air" />
                            <Component name="test" value="fire" />
                        </Form>
                    );
                    expect(wrapper.find('input[value="air"]').props().checked).toEqual(true);
                    expect(wrapper.find('input[value="fire"]').props().checked).toEqual(false);
                    wrapper.find('input[value="fire"]').simulate('change');
                    expect(setValue).toHaveBeenCalled();
                    expect(setValue.mock.calls[0][1]).toEqual('fire');
                });
            });
        }
    });
};
