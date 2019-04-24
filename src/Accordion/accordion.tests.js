import React from 'react';
import { Accordion, AccordionContext } from '../..';

describe('Accordion', () => {
    it('Can set custom classname', () => {
        const wrapper = mount(
            <Accordion className="custom" />
        );
        expect(wrapper.find('dl').prop('className')).toEqual('accordion custom');
        wrapper.setProps({ className: 'customary' });
        expect(wrapper.find('dl').prop('className')).toEqual('accordion customary');
    });

    it('AccordionContext object structure', () => {
        let context;
        mount(
            <Accordion>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        expect(context).toMatchObject({
            openFirst: undefined,
            openOnFocus: undefined,
            expanded: []
        });
    });

    it('Can add item', () => {
        let context;
        const wrapper = mount(
            <Accordion>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        context.addItem('abc');
        context.addItem('abc');
        expect(wrapper.find('Accordion').state('items')).toEqual(['abc']);
    });

    it('Can open first item by default', () => {
        let context;
        const wrapper = mount(
            <Accordion openFirst>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        context.addItem('abc');
        expect(wrapper.find('Accordion').state('items')).toEqual(['abc']);
        expect(context.expanded).toEqual(['abc']);
    });

    it('Can remove existing item', () => {
        let context;
        const wrapper = mount(
            <Accordion openFirst>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        context.addItem('abc');
        expect(wrapper.find('Accordion').state('items')).toEqual(['abc']);
        context.removeItem('abc');
        expect(wrapper.find('Accordion').state('items')).toEqual([]);
    });

    it('Can set item visibility', () => {
        let context;
        const wrapper = mount(
            <Accordion openFirst>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        context.addItem('abc');
        expect(wrapper.find('Accordion').state('items')).toEqual(['abc']);
        context.setItemVisibility('abc', true);
        expect(context.expanded).toEqual(['abc']);
        context.setItemVisibility('abc', false);
        expect(context.expanded).toEqual([]);
    });

    it('Can open multiple', () => {
        let context;
        const wrapper = mount(
            <Accordion openMultiple>
                <AccordionContext.Consumer>
                    { (ctx) => { context = ctx; } }
                </AccordionContext.Consumer>
            </Accordion>
        );
        context.addItem('abc');
        context.addItem('def');
        expect(wrapper.find('Accordion').state('items')).toEqual(['abc', 'def']);
        context.setItemVisibility('abc', true);
        context.setItemVisibility('def', true);
        expect(context.expanded).toEqual(['abc', 'def']);
    });
});
