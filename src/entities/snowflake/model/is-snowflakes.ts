import { getValueFromStorage, setValueToStorage, subscribeToStorageValue } from '@/shared/lib/storage';

const getIsSnowflakes = async () => {
  return (await getValueFromStorage<'isSnowflakes', boolean>('isSnowflakes')) ?? false;
};

const setIsSnowflakes = async (value: boolean) => {
  await setValueToStorage<'isSnowflakes', boolean>('isSnowflakes', value);
};

const subscribeToIsSnowflakes = async (callback: (newValue?: boolean, oldValue?: boolean) => void) => {
  return subscribeToStorageValue<'isSnowflakes', boolean>('isSnowflakes', callback);
};

export { getIsSnowflakes, setIsSnowflakes, subscribeToIsSnowflakes };
