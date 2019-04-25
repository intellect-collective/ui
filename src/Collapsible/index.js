import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The Collapsible component is designed to provide the ability to transform a
 * child on hide/unhide.
 */
export default class Collapsible extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        children: PropTypes.any,
        component: PropTypes.any
    };
    static defaultProps = {
        component: 'div',
        className: 'collapsible'
    };

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            height: '0px'
        };
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open === this.props.open) {
            return;
        }

        if (this.props.open) {
            this.expand();
        } else {
            this.collapse();
        }
    }

    expand() {
        const self = this;
        this.setState({ animating: true, height: '0px' }, () => {
            self.node.addEventListener('transitionend', function f(e) {
                self.node.removeEventListener('transitionend', f);
                self.setState({ animating: false });
            });
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.setState({ height: this.node.scrollHeight + 'px' });
                })
            })
        });
    }

    collapse() {
        const self = this;
        this.setState({ animating: true, height: this.node.scrollHeight + 'px' }, () => {
            self.node.addEventListener('transitionend', function f(e) {
                self.node.removeEventListener('transitionend', f);
                self.setState({ animating: false });
            });
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.setState({ height: '0px' });
                });
            });
        });
    }

    render() {
        const { animating, height } = this.state;
        const { className, component: Component, open, ...props } = this.props;
        return (
            <Component { ...props }
                    className={ classnames(className, { animating, collapsed: !animating && !open }) }
                    data-collapsed={ !animating && !open }
                    style={{ height }}
                    ref={ (ref) => { this.node = ref; } }>
                { this.props.children }
            </Component>
        );
    }
}