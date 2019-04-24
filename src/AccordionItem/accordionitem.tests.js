import React from 'react';
import { AccordionContext, AccordionItem, AccordionItemContext } from '../..';

describe('AccordionItem', () => {
    it('Can specify id', () => {
        const ctx = {
            expanded: [],
            addItem: jest.fn()
        };
        let context;
        mount(
            <AccordionContext.Provider value={ ctx }>
                <AccordionItem id="test">
                    <AccordionItemContext.Consumer>
                        { (ctx) => { context = ctx; } }
                    </AccordionItemContext.Consumer>
                </AccordionItem>
            </AccordionContext.Provider>
        );
        expect(context.id).toEqual('test');
    });

    it('Can generate id', () => {
        const ctx = {
            expanded: [],
            addItem: jest.fn()
        };
        let context;
        mount(
            <AccordionContext.Provider value={ ctx }>
                <AccordionItem>
                    <AccordionItemContext.Consumer>
                        { (ctx) => { context = ctx; } }
                    </AccordionItemContext.Consumer>
                </AccordionItem>
            </AccordionContext.Provider>
        );
        expect(context.id).toBeDefined();
    });

    it('Deregisters on unmount', () => {
        const ctx = {
            expanded: [],
            addItem: jest.fn(),
            removeItem: jest.fn()
        };
        const wrapper = mount(
            <AccordionContext.Provider value={ ctx }>
                <AccordionItem />
            </AccordionContext.Provider>
        );
        wrapper.setProps({ children: null });
        expect(ctx.removeItem).toHaveBeenCalledTimes(1);
    });

    it('Context-less operation', () => {
        const wrapper = mount(
            <AccordionItem />
        );
        wrapper.unmount();
    });
});
