import { describe, expect, it } from "vitest";
import {
  firstToUpperCase,
  formatNumericWithSpaces,
  normalizeNumber,
  replaceDashesWithSpaces,
  snakeToCamel,
} from "..";

describe("formatNumericWithSpaces", () => {
  it("should handle 0", () => {
    expect(formatNumericWithSpaces("0")).toBe("0");
  });

  it("should not add spaces to digit", () => {
    expect(formatNumericWithSpaces("1")).toBe("1");
  });

  it("should not add spaces to hundredth number", () => {
    expect(formatNumericWithSpaces("100")).toBe("100");
  });

  it("should add spaces to thousandth number", () => {
    expect(formatNumericWithSpaces("1000")).toBe("1 000");
  });

  it("should add spaces to negative number", () => {
    expect(formatNumericWithSpaces("-1000")).toBe("-1 000");
  });

  it("should not add spaces to decimal digit", () => {
    expect(formatNumericWithSpaces("1.123")).toBe("1.123");
  });

  it("should add spaces to decimal thousandth number", () => {
    expect(formatNumericWithSpaces("1123.123")).toBe("1 123.123");
  });

  it("should handle every digit in thousandth number", () => {
    expect(formatNumericWithSpaces("10123456789")).toBe("10 123 456 789");
  });

  it("should handle large numbers", () => {
    expect(formatNumericWithSpaces("10000")).toBe("10 000");
    expect(formatNumericWithSpaces("100000")).toBe("100 000");
    expect(formatNumericWithSpaces("1000000")).toBe("1 000 000");
    expect(formatNumericWithSpaces("10000000")).toBe("10 000 000");
    expect(formatNumericWithSpaces("100000000")).toBe("100 000 000");
  });

  it("should handle very large number", () => {
    expect(formatNumericWithSpaces("1000000000000000000")).toBe(
      "1 000 000 000 000 000 000"
    );
  });
});

describe("firstToUpperCase", () => {
  it("should handle empty string", () => {
    expect(firstToUpperCase("")).toBe("");
  });

  it("should handle whitespace string", () => {
    expect(firstToUpperCase(" ")).toBe(" ");
  });

  it("should handle single character", () => {
    expect(firstToUpperCase("a")).toBe("A");
  });

  it("should handle single word", () => {
    expect(firstToUpperCase("single")).toBe("Single");
  });

  it("should handle uppercase first char single word", () => {
    expect(firstToUpperCase("Single")).toBe("Single");
  });

  it("should handle special signs", () => {
    expect(firstToUpperCase("!")).toBe("!");
    expect(firstToUpperCase(";")).toBe(";");
    expect(firstToUpperCase(".")).toBe(".");
  });
});

describe("replaceDashesWithSpaces", () => {
  it("should handle empty string", () => {
    expect(replaceDashesWithSpaces("")).toBe("");
  });

  it("should handle single underscore", () => {
    expect(replaceDashesWithSpaces("_")).toBe(" ");
  });

  it("should handle multiple underscores", () => {
    expect(replaceDashesWithSpaces("___")).toBe("   ");
  });

  it("should handle trailing underscore", () => {
    expect(replaceDashesWithSpaces("_replacement")).toBe(" replacement");
  });

  it("should handle leading underscore", () => {
    expect(replaceDashesWithSpaces("replacement_")).toBe("replacement ");
  });

  it("should handle underscore inside text", () => {
    expect(replaceDashesWithSpaces("inside_text")).toBe("inside text");
  });

  it("should handle multiple underscores inside text", () => {
    expect(replaceDashesWithSpaces("multiple_inside_text")).toBe(
      "multiple inside text"
    );
  });

  it("should handle multiple complex underscores", () => {
    expect(replaceDashesWithSpaces("_multiple___inside_t_e_x_t_123_")).toBe(
      " multiple   inside t e x t 123 "
    );
  });
});

describe("normalizeNumber", () => {
  it("should handle simple normalization", () => {
    expect(normalizeNumber({ val: 5, min: 0, max: 10 })).toBeCloseTo(0.5);
  });

  it("should handle min/max ranges", () => {
    expect(normalizeNumber({ val: 0, min: 0, max: 10 })).toBe(0);
    expect(normalizeNumber({ val: 10, min: 0, max: 10 })).toBe(1);
  });

  it("should handle value below range", () => {
    expect(normalizeNumber({ val: -5, min: 0, max: 10 })).toBeCloseTo(-0.5);
  });

  it("should handle value above range", () => {
    expect(normalizeNumber({ val: 15, min: 0, max: 10 })).toBeCloseTo(1.5);
  });

  it("returns 0 when min and max are the same and val equals min", () => {
    expect(normalizeNumber({ val: 5, min: 5, max: 5 })).toBeNaN();
  });

  it("handles invalid range where max equals min", () => {
    expect(normalizeNumber({ val: 10, min: 5, max: 5 })).toBe(Infinity);
  });
});

describe("snakeToCamel", () => {
  it("should handle empty string", () => {
    expect(snakeToCamel("")).toBe("");
  });

  it("should handle single word", () => {
    expect(snakeToCamel("snake")).toBe("snake");
  });

  it("should handle two words", () => {
    expect(snakeToCamel("double_snake")).toBe("doubleSnake");
  });

  it("should handle multiple words", () => {
    expect(snakeToCamel("snake_to_camel")).toBe("snakeToCamel");
  });

  it("should handle leading underscore", () => {
    expect(snakeToCamel("_leading_snake")).toBe("leadingSnake");
  });

  it("should handle trailing underscore", () => {
    expect(snakeToCamel("trailing_snake_")).toBe("trailingSnake");
  });

  it("should handle leading & trailing underscore", () => {
    expect(snakeToCamel("_leading_and_trailing_snake_")).toBe(
      "leadingAndTrailingSnake"
    );
  });

  it("should handle UPPERCASE words", () => {
    expect(snakeToCamel("UPPERCASE_SNAKE")).toBe("uppercaseSnake");
  });

  it("should handle mixed uppercase and lowercase words", () => {
    expect(snakeToCamel("mixed_UPPERCASE_snake")).toBe("mixedUppercaseSnake");
  });
});
