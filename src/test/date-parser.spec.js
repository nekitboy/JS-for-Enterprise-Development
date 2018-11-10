import {sum} from "../mock"

describe('Test inputs', () => {
    it('inputs 1 and 2, result 3', () => {
        expect(sum(1, 2)).toBe(3);
    })

    it('inputs null and null, result 3', () => {
        expect(sum(null, null)).toBe(0)
    })
})

