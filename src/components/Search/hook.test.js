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

test("should use initial values", () => {
  const { result } = renderHook(() =>
    useForm({
      initialKeyword: "avengers",
    })
  );
  
  expect(result.current.keyword).toBe("avengers");
});

test("should update correctly times when used twice", () => {
  const { result } = renderHook(() => 
    useForm({
      initialKeyword: KEYWORD,
    })
  );
  act(() => {
    result.current.updateKeyword("B");
    result.current.updateKeyword("Ba");
  });
  expect(result.current.keyword).toBe("Ba");
  expect(result.current.times).toBe(2)
});
