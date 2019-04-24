import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import orderBy from 'lodash/orderBy';
import maxBy from 'lodash/maxBy';
import {
    format, isAfter, isBefore, isSameDay
} from 'date-fns';
import { isSameOrAfter, isSameOrBefore } from '../common';
import Event from '../CalendarEvent';

export default class EventContainer extends React.Component {
    static propTypes = {
        day: PropTypes.instanceOf(Date),
        events: PropTypes.array,
        index: PropTypes.number,
        current: PropTypes.instanceOf(Date),
        selected: PropTypes.instanceOf(Date),
        monthStart: PropTypes.instanceOf(Date),
        monthEnd: PropTypes.instanceOf(Date),
        onDrop: PropTypes.func
    };

    constructor() {
        super();
        this.state = {};
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDragOver(ev) {
        ev.preventDefault();
        this.setState({ highlight: true });
    }

    onDragLeave() {
        this.setState({ highlight: false });
    }

    onDrop(ev) {
        this.setState({ highlight: false });
        if (this.props.onDrop) {
            this.props.onDrop(ev, this.props.day);
        }
    }

    renderEvents(day, events) {
        let tmp = events.filter((event) => {
            return isSameOrBefore(event.start, day)
                && isSameOrAfter(event.end || event.start, day);
        });
        if (tmp.length === 0) {
            return '';
        }
        tmp = orderBy(tmp, 'position');
        return Array.from({ length: maxBy(tmp, 'position').position + 1 })
            .map((o, i) => {
                const event = tmp.find((o) => (o.position === i));
                if (!event) {
                    return (<div className="calendar-spacer" key={ `k${ i }` }>&nbsp;</div>); // eslint-disable-line react/no-array-index-key
                }
                return (
                    <Event day={ day }
                            event={ event }
                            key={ event.id }
                            index={ this.props.index } />
                );
            });
    }

    render() {
        return (
            <td className={ classnames({
                current: isSameDay(this.props.day, this.props.current),
                selected: isSameDay(this.props.day, this.props.selected),
                outside: isBefore(this.props.day, this.props.monthStart)
                        || isAfter(this.props.day, this.props.monthEnd),
                past: isBefore(this.props.day, this.props.current),
                highlight: this.state.highlight
            }) }
                    onDragOver={ this.onDragOver }
                    onDragLeave={ this.onDragLeave }
                    onDrop={ this.onDrop }>
                <div className="day-label">{ format(this.props.day, 'd') }</div>
                { this.renderEvents(this.props.day, this.props.events) }
            </td>
        );
    }
}
