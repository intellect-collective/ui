import React from 'react';

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
    it.skip('Should throw an error on missing name', () => {
        expect(() => {
            mount(<Component />);
        }).toThrowError(getMissingFieldError('name'));
    });

    it('Should accept valid props', () => {
        const wrapper = validMount(Component, validProps);
        expect(wrapper).toMatchSnapshot();
        Object.keys(validProps)
            .forEach((key) => {
                expect(wrapper.find(element).prop(key))
                    .toEqual((expectedProps || validProps)[key]);
            });
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
        expect(fn).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({
                name: validProps.name
            })
        }));
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
    it.skip('Should throw an error on missing name', () => {
        expect(() => {
            mount(<Component />);
        }).toThrowError(getMissingFieldError('name'));
    });

    it('Should accept valid props', () => {
        const wrapper = validMount(Component, validProps);
        expect(wrapper).toMatchSnapshot();
        Object.keys(validProps)
            .forEach((key) => {
                expect(wrapper.find(element).prop(key))
                    .toEqual((expectedProps || validProps)[key]);
            });
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
        expect(fn).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({
                name: validProps.name
            })
        }));
    });
}
