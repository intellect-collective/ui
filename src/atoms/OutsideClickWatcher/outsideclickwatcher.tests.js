import React from 'react';
import OutsideClickWatcher from '.';

const test = (onClick = () => {}) => {
    return mount(
        <div>
            <OutsideClickWatcher onClick={ onClick }>
                <button>test</button>
            </OutsideClickWatcher>
        </div>
    );
};

describe('OutsideClickWatcher', () => {
    it('Should render unaltered children', () => {
        const wrapper = test();
        expect(wrapper.exists('button')).toEqual(true);
    });
    it('Should ignore clicks on children', () => {
        const map = {};
        const old = document.addEventListener;
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        const fn = jest.fn();
        const wrapper = test(fn);
        map.mousedown({ target: wrapper.find('button').instance() });
        expect(fn).not.toHaveBeenCalled();
        document.addEventListener = old;
    });
    it('Should fire on click outside of dom node', () => {
        const map = {};
        const old = document.addEventListener;
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        const fn = jest.fn();
        const wrapper = test(fn);
        map.mousedown({ target: wrapper.instance() });
        expect(fn).toHaveBeenCalled();
        document.addEventListener = old;
    });
    it('Unmounting removes the listener', () => {
        const map = {};
        const oldAdd = document.addEventListener;
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        const oldRemove = document.removeEventListener;
        document.removeEventListener = jest.fn((event) => {
            delete map[event];
        });

        const fn = jest.fn();
        const wrapper = test(fn);
        map.mousedown({ target: wrapper.instance() });
        expect(fn).toHaveBeenCalled();
        wrapper.unmount();
        expect(Object.keys(map).length).toEqual(0);

        document.addEventListener = oldAdd;
        document.removeEventListener = oldRemove;
    });
});
