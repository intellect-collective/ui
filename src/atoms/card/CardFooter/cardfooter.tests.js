import React from 'react';
import {
    CardFooter
} from '../../../..';

describe('CardFooter', () => {
    it('Can display', () => {
        const wrapper = mount(
            <CardFooter title="Test" />
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.card-footer').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<CardFooter title="Test" className="my-card" />);
        expect(wrapper.find('.my-card').exists()).toBe(true);
    });
});
