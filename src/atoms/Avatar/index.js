import React from 'react';

const normalizeAlt = (alt) => {
	if (alt.indexOf(' ') !== -1) {
		return (alt[0] + alt[alt.indexOf(' ') + 1]).toUpperCase();
	}
	return (alt[0] + alt[1]).toUpperCase();
}

const Avatar = ({ src, alt }) => {
	return (
		<img className="avatar" src={ src } alt={ normalizeAlt(alt) } />
	);
};
Avatar.displayName = 'Avatar';
export default Avatar;