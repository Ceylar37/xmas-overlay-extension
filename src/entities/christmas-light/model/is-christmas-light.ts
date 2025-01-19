import { getValueFromStorage, setValueToStorage, subscribeToStorageValue } from '@/shared/lib/storage';

const getIsChristmasLights = async () => {
  return (await getValueFromStorage<'isChristmasLights', boolean>('isChristmasLights')) ?? false;
};

const setIsChristmasLights = async (value: boolean) => {
  await setValueToStorage<'isChristmasLights', boolean>('isChristmasLights', value);
};

const subscribeToIsChristmasLights = async (callback: (newValue?: boolean, oldValue?: boolean) => void) => {
  return subscribeToStorageValue<'isChristmasLights', boolean>('isChristmasLights', callback);
};

export { getIsChristmasLights, setIsChristmasLights, subscribeToIsChristmasLights };
