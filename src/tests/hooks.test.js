import { useToggle } from "../hooks/hooks"
import { renderHook, act } from '@testing-library/react-hooks'

test('toggleHook', function () {
	const { result } = renderHook(() => useToggle(false))
	expect(result.current[0]).toBeFalsy()
	act(() => result.current[1]())
	expect(result.current[0]).toBeTruthy()
	act(() => result.current[1]())
	expect(result.current[0]).toBeFalsy()
})
