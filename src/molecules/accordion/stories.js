import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AccordionItemTitle from './AccordionItemTitle';
import AccordionItemBody from './AccordionItemBody';

storiesOf('Molecules / Accordion', module)
    .add('default', () => (
        <Accordion>
            <AccordionItem>
                <AccordionItemTitle>Accessible Accordion</AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Accessible Accordion component for React. Inspired by <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html">the WAI/ARIA examples</a>.
                    </p>
                </AccordionItemBody>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemTitle>Components</AccordionItemTitle>
                <AccordionItemBody>
                    <ul>
                        <li>Accordion</li>
                        <li>AccordionItem</li>
                        <li>AccordionItemTitle</li>
                        <li>AccordionItemBody</li>
                    </ul>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    ))
    .add('open on focus', () => (
        <Accordion openOnFocus>
            <AccordionItem>
                <AccordionItemTitle>Accessible Accordion</AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Accessible Accordion component for React. Inspired by <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html">the WAI/ARIA examples</a>.
                    </p>
                </AccordionItemBody>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemTitle>Components</AccordionItemTitle>
                <AccordionItemBody>
                    <ul>
                        <li>Accordion</li>
                        <li>AccordionItem</li>
                        <li>AccordionItemTitle</li>
                        <li>AccordionItemBody</li>
                    </ul>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    ))
    .add('open first', () => (
        <Accordion openFirst openOnFocus>
            <AccordionItem>
                <AccordionItemTitle>Accessible Accordion</AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Accessible Accordion component for React. Inspired by <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html">the WAI/ARIA examples</a>.
                    </p>
                </AccordionItemBody>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemTitle>Components</AccordionItemTitle>
                <AccordionItemBody>
                    <ul>
                        <li>Accordion</li>
                        <li>AccordionItem</li>
                        <li>AccordionItemTitle</li>
                        <li>AccordionItemBody</li>
                    </ul>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    ))
    .add('allow multiple', () => (
        <Accordion openFirst openMultiple>
            <AccordionItem>
                <AccordionItemTitle>Accessible Accordion</AccordionItemTitle>
                <AccordionItemBody>
                    <p>
                        Accessible Accordion component for React. Inspired by <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html">the WAI/ARIA examples</a>.
                    </p>
                </AccordionItemBody>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemTitle>Components</AccordionItemTitle>
                <AccordionItemBody>
                    <ul>
                        <li>Accordion</li>
                        <li>AccordionItem</li>
                        <li>AccordionItemTitle</li>
                        <li>AccordionItemBody</li>
                    </ul>
                </AccordionItemBody>
            </AccordionItem>
        </Accordion>
    ));
