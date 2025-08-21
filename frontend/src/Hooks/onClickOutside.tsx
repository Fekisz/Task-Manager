import type { RefObject } from "react";
import { useEffect, useRef } from "react";

const useOnClickOutside = (
	elementRef: RefObject<Element>,
	callback: () => void
) => {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const handleClickOutside = (event: MouseEvent) => {
		if (!elementRef.current.contains(event.target as Element) && callback) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [callbackRef, elementRef]);
};

export default useOnClickOutside;
