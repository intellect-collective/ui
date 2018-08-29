import React from 'react';
import { storiesOf } from '@storybook/react';
import { Discussion } from '../../../..';
import stateful from '../../../../.storybook/decorators/stateful';

const user = {
    url: '/u/johnsmith',
    name: 'John Smith',
    me: true
};

const messages = [
    {
        date: new Date(),
        content: 'Hi!',
        user: {
            name: 'initiate'
        }
    },
    {
        date: new Date(),
        content: 'Who are you?!',
        user
    },
    {
        date: new Date(),
        content: 'Nobody of consequence...',
        user: {
            name: 'initiate'
        }
    },
    {
        date: new Date(),
        content: 'Want to hear a funny story?',
        user: {
            name: 'initiate'
        }
    },
    {
        date: new Date(),
        content: 'I want you to leave me alone!',
        user
    },
    {
        date: new Date(),
        content: 'Now why would I do that?',
        user: {
            name: 'initiate'
        }
    }
].map((o, id) => ({ ...o, id }));

storiesOf('Molecules / Discussion / Discussion', module)
    .addDecorator(stateful({ messages }))
    .add('default', () => (onChange, state) => (
        <Discussion messages={ state.messages }
                onSubmitMessage={ (content) => {
                    onChange('messages', [ ...state.messages, {
                        id: state.messages.length,
                        date: new Date(),
                        content,
                        user
                    } ])
                } } />
    ));
