import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../..';

// NOTE: Because the Modal renders to a component outside the React tree, we
// don't have the opportunity to use Jest snapshots here :(

describe('Modal', () => {
    const old = global.requestAnimationFrame;
    let wrapper;
    let container;
    beforeEach(() => {
        global.requestAnimationFrame = (callback) => {
            callback();
        };

        expect(document.body.childElementCount).toEqual(0);
    });
    afterEach(() => {
        global.requestAnimationFrame = old;
        try {
            wrapper.instance().remove();
            wrapper.unmount();
        } catch (err) {
            // no-op
        }
        if (container) {
            container.remove();
        }
    });

    it('Should start without visible class', () => {
        global.requestAnimationFrame = old;
        wrapper = mount(<Modal />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
    });

    it('Should add visible class on next render', () => {
        wrapper = mount(<Modal />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
    });

    it('Should update modal contents', () => {
        wrapper = mount(<Modal>test</Modal>);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content">test</div></div></div></div>'
        );
        wrapper.setProps({ children: 'tester' });
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content">tester</div></div></div></div>'
        );
    });

    it('Should close on overlay click', () => {
        const onClose = jest.fn();
        wrapper = mount(<Modal onClose={ onClose } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        TestUtils.Simulate.click(wrapper.instance()._outerRef, {});
        expect(onClose.mock.calls.length).toBe(1);
    });

    it('Should ignore inner clicks', () => {
        const onClose = jest.fn();
        wrapper = mount(<Modal onClose={ onClose } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        TestUtils.Simulate.click(wrapper.instance()._outerRef, {
            target: wrapper.instance()._dialogRef
        });
        expect(onClose.mock.calls.length).toBe(0);
    });

    it('Should close on overlay mouse up', () => {
        const onClose = jest.fn();
        wrapper = mount(<Modal onClose={ onClose } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        TestUtils.Simulate.mouseUp(wrapper.instance()._outerRef, {});
        expect(onClose.mock.calls.length).toBe(1);
    });

    it('Should ignore inner mouse up', () => {
        const onClose = jest.fn();
        wrapper = mount(<Modal onClose={ onClose } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        TestUtils.Simulate.mouseUp(wrapper.instance()._outerRef, {
            target: wrapper.instance()._dialogRef
        });
        expect(onClose.mock.calls.length).toBe(0);
    });

    it('Should not unmount before transition has ended', () => {
        wrapper = mount(<Modal />);
        container = wrapper.instance().el;
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        wrapper.unmount();
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
    });

    it('Should unmount after transition has ended', () => {
        wrapper = mount(<Modal />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        wrapper.instance().state.visible = false;
        wrapper.instance().onTransitionEnd();
        expect(document.body.childElementCount).toBe(0);
    });

    it('Should unmount after timeout if no transition', () => {
        wrapper = mount(<Modal removeTimeout={ 0 } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        wrapper.instance().state.visible = false;
        jest.useFakeTimers();
        wrapper.unmount();
        jest.runAllTimers();
        expect(document.body.childElementCount).toBe(0);
    });

    it('Should ignore transition end if not invisible', () => {
        wrapper = mount(<Modal />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
        wrapper.instance().onTransitionEnd();
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
    });

    it('Supports rendering to custom element', () => {
        const el = document.createElement('DIV');
        el.classList.add('test');
        document.body.appendChild(el);

        wrapper = mount(<Modal element={ el } />);
        expect(document.body.lastChild.outerHTML).toBe(
            '<div class="test"><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"></div></div></div></div>'
        );
    });

    it('Can use modal section atoms', () => {
        wrapper = mount(
            <Modal>
                <ModalHeader>
                    <h3>Are You Sure?</h3>
                </ModalHeader>
                <ModalBody>
                    <p>
                        Do you really want to select that option?
                        Things might not go as planned...
                    </p>
                </ModalBody>
                <ModalFooter>
                    <button name="yes" className="btn">Yes!</button>
                    <button name="yes" className="btn">Also Yes!</button>
                </ModalFooter>
            </Modal>
        );
        expect(document.body.lastChild.outerHTML).toBe(
            '<div><div class="modal visible" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3>Are You Sure?</h3></div><div class="modal-body"><p>Do you really want to select that option? Things might not go as planned...</p></div><div class="modal-footer"><button name="yes" class="btn">Yes!</button><button name="yes" class="btn">Also Yes!</button></div></div></div></div></div>'
        );
    });
});
