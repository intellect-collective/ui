import React from 'react';
import { Form, FieldGroup } from '..';

export const getMissingFieldError = (name) => (
    new RegExp(`Warning: Failed prop type: The prop \`${ name }\` is marked as required *`)
);

export const getInvalidFieldError = (name) => (
    new RegExp(`Warning: Failed prop type: Invalid prop \`${ name }\`*`)
);

export const validMount = (Component, props) => {
    let wrapper;
    expect(() => {
        wrapper = mount(<Component { ...props } />);
    }).not.toThrow();
    return wrapper;
};

export const expectConsoleError = (fn, warning) => {
    /* eslint-disable no-console */
    const oldError = console.error;
    console.error = jest.fn();
    try {
        fn();
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toMatch(warning);
    } catch (err) {
        oldError(err);
    }
    console.error = oldError;
    /* eslint-enable no-console */
};

export const expectNoConsoleError = (fn) => () => {
    /* eslint-disable no-console */
    const oldWarn = console.warn;
    const oldError = console.error;
    console.warn = jest.fn();
    console.error = jest.fn();
    try {
        fn();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    } catch (err) {
        oldError(err);
    }
    console.warn = oldWarn;
    console.error = oldError;
    /* eslint-enable no-console */
};

/**
 * A set of basic tests for those components that use the `changeable` wrapper.
 * @param {ReactElement} Component - The component to test
 * @param {String} element - The html element to examine
 * @param {Object} validProps - The props to pass the component
 * @param {Object} expectedProps - The props expected to be present on the html
 *         element
 */
export function basicChangeableTests(Component,
        element,
        validProps,
        expectedProps) {
    describe('Basic changeable tests', () => {
        it('Should throw an error on missing name', () => {
            expectConsoleError(() => {
                mount(<Component />);
            }, getMissingFieldError('name'));
        });

        it('Should accept valid props', () => {
            const wrapper = validMount(Component, validProps);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find(element).props()).toMatchObject(expectedProps);
        });

        it('Clicking without handler is no-op', () => {
            const wrapper = validMount(Component, validProps);
            wrapper.find(element).simulate('change');
        });

        it('Clicking with handler supplies name and event', () => {
            const fn = jest.fn();
            const wrapper = validMount(Component, {
                ...validProps,
                onChange: fn
            });
            wrapper.find(element).simulate('change');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name
                }
            });
        });
    });
    describe('Form-encapsulated', () => {
        it('Should set form value', () => {
            const {
                onChange,
                onClick,
                ...props
            } = validProps;
            const fn = jest.fn();
            const wrapper = mount(
                <Form action="/" onChange={ fn }>
                    <Component { ...props } />
                </Form>
            );
            wrapper.find(element).simulate('change', {
                target: {
                    name: validProps.name,
                    value: 'blah'
                }
            });
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name,
                    value: 'blah'
                }
            });
        });
    });
}

/**
 * A set of basic tests for those components that use the `clickable` wrapper.
 * @param {ReactElement} Component - The component to test
 * @param {String} element - The html element to examine
 * @param {Object} validProps - The props to pass the component
 * @param {Object} expectedProps - The props expected to be present on the html
 *         element
 */
export function basicClickableTests(Component,
        element,
        validProps,
        expectedProps) {
    describe('Basic clickable tests', () => {
        it('Should throw an error on missing name', () => {
            expectConsoleError(() => {
                mount(<Component />);
            }, getMissingFieldError('name'));
        });

        it('Should accept valid props', () => {
            const wrapper = validMount(Component, validProps);
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find(element).props()).toMatchObject(expectedProps);
        });

        it('Clicking without handler is no-op', () => {
            const wrapper = validMount(Component, validProps);
            wrapper.find(element).simulate('click');
        });

        it('Clicking with handler supplies name and event', () => {
            const fn = jest.fn();
            const wrapper = validMount(Component, {
                ...validProps,
                onClick: fn
            });
            wrapper.find(element).simulate('click');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name
                }
            });
        });
    });
    describe('Form-encapsulated', () => {
        it('Should set form value', () => {
            const {
                onChange,
                onClick,
                ...props
            } = validProps;
            const fn = jest.fn();
            const wrapper = mount(
                <Form action="/" onChange={ fn }>
                    <Component { ...props } />
                </Form>
            );
            wrapper.find(element).simulate('click');
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn.mock.calls[0][0]).toMatchObject({
                target: {
                    name: validProps.name
                }
            });
        });
    });
}

/**
 * A set of tests that ensure minimal re-rendering of the given component.
 * @param {ReactElement} Component - The component to test
 * @param {Object} validProps - A set of valid props for Component
 */
export function rerenderSuppressionTests(Component, validProps) {
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
}
