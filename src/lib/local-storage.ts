function saveToLocalStorage(key: string, value: string): void {
	window.localStorage.setItem(key, value);
}

function getFromLocalStorage(key: string): string | null {
	return window.localStorage.getItem(key);
}

export { saveToLocalStorage, getFromLocalStorage };
