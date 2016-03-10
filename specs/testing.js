describe("this testing suite", function() {
 it ("should show that true is true", function() {
   expect(true).toEqual(true);
 })
 it ("should show that false is not true", function() {
   expect(false).not.toBe(true);
 })
});