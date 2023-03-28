import {NativeModules} from 'react-native';

interface RandomModuleInterface {
  getRandomColor: () => Promise<[number, number, number]>;
}

export const RandomModule: RandomModuleInterface = NativeModules.RandomModlue;
