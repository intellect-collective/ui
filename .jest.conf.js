import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// const oldWarn = console.warn;
console.warn = function (warn) {
	// oldWarn(warn);
    throw new Error(warn);
};
// const oldError = console.error;
console.error = function (err) {
	// oldError(err);
    throw new Error(err);
};
