import React from 'react';
import {
    CardBody
} from '../..';

describe('CardBody', () => {
    it('Can display', () => {
        const wrapper = mount(
            <CardBody>test</CardBody>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.card-body').exists()).toBe(true);
    });
    it('Can change classname', () => {
        const wrapper = mount(<CardBody className="my-card" />);
        expect(wrapper.find('.my-card').exists()).toBe(true);
    });
});
