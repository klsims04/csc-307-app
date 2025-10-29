// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// ========== Tests for sum() ==========
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// ========== Tests for div() ==========
test('Testing div -- basic division', () => {
  const expected = 5;
  const got = mut.div(10, 2);
  expect(got).toBe(expected);
});

test('Testing div -- division resulting in decimal', () => {
  const expected = 2.5;
  const got = mut.div(5, 2);
  expect(got).toBe(expected);
});

test('Testing div -- division by 1', () => {
  const expected = 42;
  const got = mut.div(42, 1);
  expect(got).toBe(expected);
});

test('Testing div -- division of 0 by a number', () => {
  const expected = 0;
  const got = mut.div(0, 5);
  expect(got).toBe(expected);
});

test('Testing div -- division by zero returns Infinity', () => {
  const got = mut.div(10, 0);
  expect(got).toBe(Infinity);
});

test('Testing div -- division of negative numbers', () => {
  const expected = -5;
  const got = mut.div(-10, 2);
  expect(got).toBe(expected);
});

test('Testing div -- division of two negative numbers', () => {
  const expected = 3;
  const got = mut.div(-15, -5);
  expect(got).toBe(expected);
});

test('Testing div -- very small result', () => {
  const got = mut.div(1, 1000);
  expect(got).toBeCloseTo(0.001, 5);
});

// ========== Tests for containsNumbers() ==========
test('Testing containsNumbers -- string with numbers', () => {
  const got = mut.containsNumbers('hello123');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- string with only numbers', () => {
  const got = mut.containsNumbers('12345');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- string with no numbers', () => {
  const got = mut.containsNumbers('hello');
  expect(got).toBe(false);
});

test('Testing containsNumbers -- empty string', () => {
  const got = mut.containsNumbers('');
  expect(got).toBe(false);
});

test('Testing containsNumbers -- string with space before number', () => {
  const got = mut.containsNumbers('test 5');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- string with only spaces', () => {
  const got = mut.containsNumbers('   ');
  expect(got).toBe(true); // BUG: spaces return true with isNaN
});

test('Testing containsNumbers -- string with special characters', () => {
  const got = mut.containsNumbers('!@#$%');
  expect(got).toBe(false);
});

test('Testing containsNumbers -- string with special characters and numbers', () => {
  const got = mut.containsNumbers('test!@#9');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- single digit', () => {
  const got = mut.containsNumbers('7');
  expect(got).toBe(true);
});

test('Testing containsNumbers -- single letter', () => {
  const got = mut.containsNumbers('a');
  expect(got).toBe(false);
});