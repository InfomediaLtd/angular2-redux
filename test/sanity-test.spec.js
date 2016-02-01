var testing_1 = require('angular2/testing');
function main() {
    testing_1.describe('universal truths', function () {
        testing_1.it('should do math', function () {
            testing_1.expect(1 + 1).toEqual(2);
            testing_1.expect(5).toBeGreaterThan(4);
        });
        xit('should skip this', function () {
            testing_1.expect(4).toEqual(40);
        });
    });
}
exports.main = main;
//# sourceMappingURL=sanity-test.spec.js.map