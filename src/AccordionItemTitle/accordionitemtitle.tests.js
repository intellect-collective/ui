import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle
} from '../..';

describe('AccordionItemTitle', () => {
    beforeEach(() => {
        jest.spyOn(Accordion.prototype, 'setItemVisibility');
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Context-less render', () => {
        const wrapper = mount(
            <AccordionItemTitle>Test</AccordionItemTitle>
        );
        expect(wrapper.find('button').prop('aria-controls')).toEqual('undefined-body');
    });

    it('With context', () => {
        const wrapper = mount(
            <AccordionItem id="test">
                <AccordionItemTitle>Test</AccordionItemTitle>
            </AccordionItem>
        );
        expect(wrapper.find('button').prop('aria-controls')).toEqual('test-body');
    });

    it('Context-less click', () => {
        const wrapper = mount(
            <AccordionItemTitle>Test</AccordionItemTitle>
        );
        wrapper.find('button').simulate('mousedown');
    });

    it('Click with context', () => {
        const wrapper = mount(
            <Accordion>
                <AccordionItem id="test">
                    <AccordionItemTitle>Test</AccordionItemTitle>
                </AccordionItem>
            </Accordion>
        );
        wrapper.find('button').simulate('mousedown');
        expect(Accordion.prototype.setItemVisibility).toHaveBeenCalledWith('test', true);
    });

    it('Focus does nothing without `openFocus`', () => {
        const wrapper = mount(
            <Accordion>
                <AccordionItem id="test">
                    <AccordionItemTitle>Test</AccordionItemTitle>
                </AccordionItem>
            </Accordion>
        );
        wrapper.find('button').simulate('focus');
        expect(Accordion.prototype.setItemVisibility).not.toHaveBeenCalled();
    });

    it('Focus does nothing if already expanded', () => {
        const wrapper = mount(
            <Accordion openOnFocus>
                <AccordionItem id="test">
                    <AccordionItemTitle>Test</AccordionItemTitle>
                </AccordionItem>
            </Accordion>
        );
        wrapper.find('button').simulate('mousedown');
        wrapper.find('button').simulate('focus');
        expect(Accordion.prototype.setItemVisibility).toHaveBeenCalledTimes(1);
    });

    it('Focus expands item', () => {
        const wrapper = mount(
            <Accordion openOnFocus>
                <AccordionItem id="test">
                    <AccordionItemTitle>Test</AccordionItemTitle>
                </AccordionItem>
            </Accordion>
        );
        wrapper.find('button').simulate('focus');
        expect(Accordion.prototype.setItemVisibility).toHaveBeenCalledWith('test', true);
    });
});
