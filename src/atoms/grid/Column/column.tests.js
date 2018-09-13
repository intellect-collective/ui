import React from 'react';
import {
    Column
} from '../../../..';

describe('Column', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Column sm-width="12" md-width="6" lg-width="4">test</Column>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.col-sm-12').exists()).toBe(true);
        expect(wrapper.find('.col-md-6').exists()).toBe(true);
        expect(wrapper.find('.col-lg-4').exists()).toBe(true);
    });
    it('Can use default medium width', () => {
        const wrapper = mount(<Column width="8" />);
        expect(wrapper.find('.col-md-8').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<Column className="my-column" />);
        expect(wrapper.find('.my-column').exists()).toBe(true);
    });
});
