import React from 'react';
import {
    Card
} from '../../../..';

describe('Card', () => {
    it('Can display', () => {
        const wrapper = mount(
            <Card>test</Card>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.card').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<Card className="my-card" />);
        expect(wrapper.find('.my-card').exists()).toBe(true);
    });
});
