import clsx from 'clsx';
import pick from 'lodash/pick';

/**
 * Builds a component's className attribute from the information given.
 */
export function classify({
	className,
	classes,
	color
}, ancillary) {
	return clsx(className, classes, {
		[`color-${ color }`]: !!color
	}, ancillary);
};


export function slot(children, fn) {
	if (!Array.isArray(children)) {
		return;
	}

	return children.filter(fn);
}


export function html_props(props) {
	return pick(props, ['style']);
}