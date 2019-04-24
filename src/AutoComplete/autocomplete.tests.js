import React from 'react';
import { AutoComplete, Form } from '../..';

const validProps = {
    id: 'test',
    name: 'test',
    value: 'fire',
    items: [
        { title: 'Wind', value: 'wind' },
        { title: 'Air', value: 'air' },
        { title: 'Fire', value: 'fire' },
        { title: 'Water', value: 'water' }
    ]
};

describe('AutoComplete', () => {
    describe('Basic AutoComplete Operation', () => {
        it('Opens on focus', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onOpen={ fn } />
            );
            wrapper.find('input').simulate('focus');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name
                }
            });
        });

        it('Opens on keydown', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onOpen={ fn } />
            );
            wrapper.find('input').simulate('keydown', {
                which: 'a'
            });
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('Does nothing on useless keydown', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps }
                        open
                        onOpen={ fn }
                        onClose={ fn }
                        onHighlight={ fn }
                        onSelect={ fn }
                        onChange={ fn } />
            );
            wrapper.find('input').simulate('keydown', {
                which: 'a'
            });
            expect(fn).toHaveBeenCalledTimes(0);
        });

        it('Closes on blur', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onClose={ fn } open />
            );
            wrapper.find('input').simulate('blur');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name
                }
            });
        });

        it('Highlights on mouseover', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } open />
            );
            wrapper.find('#test-result-1').simulate('mouseenter');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'air',
                    index: 1
                }
            });
        });

        it('Selects on click', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onSelect={ fn } open />
            );
            wrapper.find('#test-result-1').simulate('click');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'air',
                    index: 1
                }
            });
        });

        it('Down arrow selects first item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'ArrowDown'
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'wind',
                    index: 0
                }
            });
        });

        it('Down arrow will wrap to first item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } highlightedIndex={ 3 } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'ArrowDown'
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'wind',
                    index: 0
                }
            });
        });

        it('Up arrow highlights preceeding item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } highlightedIndex={ 3 } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'ArrowUp'
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'fire',
                    index: 2
                }
            });
        });

        it('Up arrow selects last item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'ArrowUp'
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'water',
                    index: 3
                }
            });
        });

        it('Up arrow will wrap to last item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onHighlight={ fn } highlightedIndex={ 0 } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'ArrowUp'
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'water',
                    index: 3
                }
            });
        });

        it('Enter key ignored if not code 13', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onClose={ fn } onSelect={ fn } />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Enter',
                keyCode: 229
            });
            expect(fn).toHaveBeenCalledTimes(0);
        });

        it('Enter key ignored if list not open', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onClose={ fn } onSelect={ fn } />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Enter',
                keyCode: 13
            });
            expect(fn).toHaveBeenCalledTimes(0);
        });

        it('Enter key closes list if nothing highlighted', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onClose={ fn } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Enter',
                keyCode: 13
            });
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('Enter key selects highlighted item', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onSelect={ fn } highlightedIndex={ 2 } open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Enter',
                keyCode: 13
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'fire',
                    index: 2
                }
            });
        });

        it('Escape key closes list', () => {
            const close = jest.fn();
            const select = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps }
                        onClose={ close }
                        onSelect={ select }
                        highlightedIndex={ 2 }
                        open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Escape'
            });
            expect(close).toHaveBeenCalledTimes(1);
            expect(select).not.toHaveBeenCalled();
        });

        it('Tab key closes list', () => {
            const close = jest.fn();
            const select = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps }
                        onClose={ close }
                        onSelect={ select }
                        highlightedIndex={ 2 }
                        open />
            );
            wrapper.find('input').simulate('keyDown', {
                key: 'Tab'
            });
            expect(close).toHaveBeenCalledTimes(1);
            expect(select).not.toHaveBeenCalled();
        });

        it('Blur ignored when mouse over list', () => {
            const fn = jest.fn();
            const wrapper = mount(
                <AutoComplete { ...validProps } onClose={ fn } />
            );
            wrapper.find('ul').simulate('mouseenter');
            wrapper.find('input').simulate('blur');
            expect(fn).not.toHaveBeenCalled();
            wrapper.find('ul').simulate('mouseleave');
            wrapper.find('input').simulate('blur');
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('All handler props can be no-op without error', () => {
            const closed = mount(
                <AutoComplete { ...validProps } />
            );
            closed.find('input').simulate('focus');

            const open = mount(
                <AutoComplete { ...validProps } open highlightedIndex={ 1 } />
            );
            open.find('input').simulate('blur');
            open.find('input').simulate('keyDown', {
                key: 'ArrowUp'
            });
            open.find('input').simulate('keyDown', {
                key: 'Enter'
            });
            open.find('input').simulate('keyDown', {
                which: 'a'
            });
        });
    });

    describe('Form Context Usage', () => {
        const handler = (data) => ({
            getValue() {
                return data;
            }
        });

        it('Gets value state from form', () => {
            const wrapper = mount(
                <Form action="/" handler={ handler('fire') }>
                    <AutoComplete name="test" items={ validProps.items } />
                </Form>
            );
            expect(wrapper.find('input').prop('value')).toEqual('fire');
        });

        it('Prefers local attributes over form attributes', () => {
            const wrapper = mount(
                <Form action="/" data={{ test: 'fire' }}>
                    <AutoComplete name="test" value="wind" items={ validProps.items } />
                </Form>
            );
            expect(wrapper.find('input').prop('value')).toEqual('wind');
        });
    });
});
