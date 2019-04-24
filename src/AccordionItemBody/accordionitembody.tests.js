import React from 'react';
import { AccordionItem, AccordionItemBody } from '../..';

describe('AccordionItemBody', () => {
    it('Context-less render', () => {
        const wrapper = mount(
            <AccordionItemBody />
        );
        expect(wrapper.find('dd').prop('aria-labelledby')).toEqual('undefined-title');
    });

    it('With context', () => {
        const wrapper = mount(
            <AccordionItem id="test">
                <AccordionItemBody />
            </AccordionItem>
        );
        expect(wrapper.find('dd').prop('aria-labelledby')).toEqual('test-title');
    });
});
