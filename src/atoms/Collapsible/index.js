import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The Collapsible component is designed to provide the ability to transform a
 * child on hide/unhide.
 */
export default class Collapsible extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        children: PropTypes.any,
        element: PropTypes.any
    };
    static defaultProps = {
        element: 'div'
    };

    constructor(props) {
        super(props);
        this.state = {
            show: props.visible
        };
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible === this.props.visible) {
            return;
        }

        if (this.props.visible) {
            this.expand();
        } else {
            this.collapse();
        }
    }

    expand() {
        const self = this;

        this.setState({ collapsing: true, show: false }, () => {
            var sectionHeight = this.node.scrollHeight;
            this.node.style.height = sectionHeight + 'px';

            this.node.addEventListener('transitionend', function f(e) {
                self.node.removeEventListener('transitionend', f);
                self.node.style.height = null;
                self.setState({ collapsing: false, show: true });
            });
        });
    }

    collapse() {
        const self = this;

        var sectionHeight = this.node.scrollHeight;
        this.node.style.height = sectionHeight + 'px';

        this.setState({ collapsing: true, show: true }, () => {
            this.node.addEventListener('transitionend', function f(e) {
                self.node.removeEventListener('transitionend', f);
                self.node.style.display = null;
                self.setState({ collapsing: false, show: false });
            });

            requestAnimationFrame(() => {
                self.node.style.height = 0 + 'px';
            });

        })
    }

    render() {
        const { collapsing, show } = this.state;
        const { className, element: Element, visible, ...props } = this.props;
        return (
            <Element { ...props }
                    className={ classnames(className, { collapsing, show, collapse: !collapsing }) }
                    data-collapsed={ !this.state.show }
                    ref={ (ref) => { this.node = ref; } }>
                { this.props.children }
            </Element>
        );
    }
}