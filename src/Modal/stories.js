import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import Modal from './index';
import { ModalHeader, ModalBody, ModalFooter } from '../..';

const renderModal = (props) => (
    <Modal { ...props }>
        <ModalHeader>
            <h3>Are You Sure?</h3>
        </ModalHeader>
        <ModalBody>
            <p>Do you really want to select that option? Things might not go as planned...</p>
        </ModalBody>
        <ModalFooter>
            <button name="yes" className="btn">Yes!</button>
            <button name="yes" className="btn">Also Yes!</button>
        </ModalFooter>
    </Modal>
);

storiesOf('Modal', module)
    .add('default', withState()(({ store }) => (
        <div>
            <button className="btn" onClick={ () => store.set({ open: !store.state.open }) }>Open</button>
            { store.state.open && renderModal({
                onClose: () => {
                    store.set({ open: false });
                }
            }) }
        </div>
    )))
    .add('without transition', withState()(({ store }) => (
        <div>
            <button className="btn" onClick={ () => store.set({ open: !state.open}) }>Open</button>
            { store.state.open && renderModal({
                className: 'other-modal',
                onClose: () => {
                    store.set({ open: false });
                }
            }) }
        </div>
    )));
