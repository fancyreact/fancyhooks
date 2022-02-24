describe('sample test', () => {
  test('should pass the test', () => (
    expect(1 + 1).toEqual(2)
  ));

  test('should not pass the test', () => (
    expect(1 + 1 === 3).toBeFalsy()
  ));
});
