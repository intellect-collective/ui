import React from 'react';
import { Form } from '..';

export const getMissingFieldError = (name) => (
    new RegExp(`Warning: Failed prop type: The prop \`${ name }\` is marked as required *`)
);

export const getInvalidFieldError = (name) => (
    new RegExp(`Warning: Failed prop type: Invalid prop \`${ name }\`*`)
);

// export const validMount = bounded;
export const validMount = (Component, props) => {
    let wrapper;
    expect(() => {
        wrapper = mount(<Component { ...props } />);
    }).not.toThrow();
    return wrapper;
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
        it.skip('Should throw an error on missing name', () => {
            expect(() => {
                mount(<Component />);
            }).toThrowError(getMissingFieldError('name'));
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
        it.skip('Should throw an error on missing name', () => {
            expect(() => {
                mount(<Component />);
            }).toThrowError(getMissingFieldError('name'));
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
