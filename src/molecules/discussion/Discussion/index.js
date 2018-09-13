import React from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';
import { Avatar } from '../../../..';

const author = (url, name) => {
    if (url) {
        return (<a className="discussion-message-author" href={ url }>{ name }</a>);
    }
    return (<span className="discussion-message-author">{ name }</span>);
}

const DiscussionMessage = ({
    message: {
        user: {
            avatar,
            url,
            name,
            me,
        },
        date,
        content
    }
}) => (
    <div className={ classnames('discussion-message', { me }) }>
        <div className="discussion-message-inner">
            <Avatar src={ avatar } alt={ name } />
            <div className="discussion-message-content">
                <a className="discussion-message-author" href={ url }>{ name }</a>
                <span className="discussion-message-date">{ format(date, 'eee, MMM d, YYYY - h:mmaaaaa') }</span>
                <span className="discussion-message-text">{ content }</span>
            </div>
        </div>
    </div>
);

const keyPressHandler = (onSubmitMessage = () => {}, onKeyPress = () => {}) => (ev) => {
    onKeyPress(ev);
    if (ev.keyCode == 13 && ev.shiftKey == false) {
        ev.preventDefault();
        onSubmitMessage(ev.target.value);
        ev.target.value = '';
    }
}

const Discussion = ({ messages, onSubmitMessage, onKeyPress }) => {
    return (
        <div className="discussion">
            {
                messages.map((message) => (<DiscussionMessage message={ message } key={ message.id } />))
            }
            <div className="discussion-form">
                <textarea name="message"
                        className="discussion-form-input"
                        placeholder="Enter message text"
                        onKeyDown={ keyPressHandler(onSubmitMessage, onKeyPress) } />
            </div>
        </div>
    )
};
Discussion.displayName = 'Discussion';
export default Discussion;
