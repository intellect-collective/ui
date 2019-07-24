import React, { Fragment } from 'react';
import { addons, makeDecorator } from '@storybook/addons';
import { EVENTS } from './constants';
import primary from '../../../themes/default.scss';
import secondary from '../../../themes/secondary.scss';

const styles = {
    primary,
    secondary
};

class Container extends React.Component {
    constructor () {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        addons.getChannel().on(EVENTS.UPDATE, this.onUpdate);
    }
    onUpdate(active) {
        styles[active].use();
    }

    render () {
        return (
            <Fragment>
                { this.props.children }
            </Fragment>
        )
    }
}

export default makeDecorator({
    name: 'styled',
    wrapper: (getStory, context, { parameters }) => (
        <Container>{ getStory(context) }</Container>
    )
})