import React from 'react';
import { FieldGroup, Form } from '../..';

/**
 * A set of tests that ensure minimal re-rendering of the given component.
 * @param {ReactElement} Component - The component to test
 * @param {Object} validProps - A set of valid props for Component
 */
export default (Component, validProps) => {
    if (typeof validProps.name === 'undefined') {
        throw new TypeError('Valid props must contain a name');
    }

    const getWrapper = (c, parent = null) => {
        if (c.Wrapped) {
            return getWrapper(c.Wrapped, c);
        }
        return parent;
    };
    const Wrapper = getWrapper(Component);

    describe('Re-render suppression tests', () => {
        let spy;
        beforeEach(() => {
            if (Object.prototype.isPrototypeOf.call(React.Component, Wrapper.Wrapped)) {
                spy = jest.spyOn(Wrapper.Wrapped.prototype, 'render');
            } else {
                spy = jest.spyOn(Wrapper, 'Wrapped');
            }
        });
        afterEach(() => {
            spy.mockRestore();
        });

        it('Should render once when form context changes', () => {
            const data = {
                [validProps.name]: 'hotdogs'
            };
            const props = {
                ...validProps,
                value: 'hotdogs'
            };
            const wrapper = mount(
                <Form action="/" data={ data }>
                    <FieldGroup name="test2">
                        <Component { ...props } />
                    </FieldGroup>
                </Form>
            );
            expect(spy).toHaveBeenCalledTimes(1);

            wrapper.setProps({ data: { [validProps.name]: 'hotdogs', other: 'on' } });
            expect(spy).toHaveBeenCalledTimes(1);

            wrapper.setProps({ data: { [validProps.name]: 'sausages' } });
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
};
