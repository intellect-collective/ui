import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from './index';
import { ModalHeader, ModalBody, ModalFooter } from '../../..';
import stateful from '../../../.storybook/decorators/stateful';

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

storiesOf('Molecules / Modal', module)
    .addDecorator(stateful())
    .add('default', () => (onChange, state) => (
        <div>
            <button className="btn" onClick={ () => onChange('open', !state.open) }>Open</button>
            { state.open && renderModal({
                onClose: () => {
                    onChange('open', false);
                }
            }) }
        </div>
    ))
    .add('without transition', () => (onChange, state) => (
        <div>
            <button className="btn" onClick={ () => onChange('open', !state.open) }>Open</button>
            { state.open && renderModal({
                className: 'other-modal',
                onClose: () => {
                    onChange('open', false);
                }
            }) }
        </div>
    ));
