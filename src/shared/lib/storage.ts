const getValueFromStorage = async <K extends string, V>(key: K) => {
  const storage = await chrome.storage.sync.get<Partial<{ [key in K]: V }>>([key]);
  return storage[key];
};

const setValueToStorage = async <K extends string, V>(key: K, value: V) => {
  await chrome.storage.sync.set({ [key]: value });
};

const subscribeToStorageValue = <K extends string, V>(key: K, callback: (newValue?: V, oldValue?: V) => void) => {
  const callbackWrapper = (storage: { [key: string]: chrome.storage.StorageChange }) => {
    if (storage[key]) {
      callback(storage[key].newValue, storage[key].oldValue);
    }
  };

  chrome.storage.onChanged.addListener(callbackWrapper);

  return () => chrome.storage.onChanged.removeListener(callbackWrapper);
};

export { getValueFromStorage, setValueToStorage, subscribeToStorageValue };
