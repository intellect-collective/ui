import { normalizeItems } from '.';

describe('Form Utilities - normalizeItems', () => {
    it('Empty array if no argument given', () => {
        expect(normalizeItems()).toEqual([]);
    });

    it('Normalize an array of title/value objects', () => {
        const values = [
            { title: 'One', value: 'first', extra: '1st' },
            { title: 'Two', value: 'second', extra: '2nd' }
        ];
        expect(normalizeItems(values)).toEqual([
            { title: 'One', value: 'first', key: 'One' },
            { title: 'Two', value: 'second', key: 'Two' }
        ]);
    });

    it('Normalize an object to an array of title/value objects', () => {
        const values = {
            One: 'first',
            Two: 'second'
        };
        expect(normalizeItems(values)).toEqual([
            { title: 'One', value: 'first', key: 'One' },
            { title: 'Two', value: 'second', key: 'Two' }
        ]);
    });
});
