import { asField } from '../utils';

const Hidden = asField('value', { type: 'hidden' })('input');
const NumberField = asField('value', { type: 'number' })('input');
const Text = asField('value', { type: 'text' })('input');
const Textarea = asField('value')('textarea');
const Password = asField('value', { type: 'password' })('input');

export {
    Hidden,
    NumberField,
    Password,
    Text,
    Textarea
};
