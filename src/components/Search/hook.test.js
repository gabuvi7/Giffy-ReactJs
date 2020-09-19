import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "./useForm";

const KEYWORD = "Batman";

test("should change keyword", () => {
  const { result } = renderHook(() => useForm());
  act(() => {
    result.current.updateKeyword(KEYWORD);
  });
  expect(result.current.keyword).toBe(KEYWORD);
});
