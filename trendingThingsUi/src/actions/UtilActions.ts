import {AsyncStorage} from 'react-native';

export async function setAuthInfo(token: string, userId: number) {
    try {
        await AsyncStorage.setItem('@TrendingThingsStore:token', token);
        await AsyncStorage.setItem('@TrendingThingsStore:userId', JSON.stringify(userId));
    } catch(error) {

    }
}

export async function getAuthInfo() {
    try {
        const token = await AsyncStorage.getItem('@TrendingThingsStore:token');
        const userId = await AsyncStorage.getItem('@TrendingThingsStore:userId');
        return {
            token,
            userId: parseInt(userId)
        };
    } catch(err) {
        return null;
    }
}

export async function removeAuthInfo() {
    try {
        await AsyncStorage.removeItem('@TrendingThingsStore:token');
        await AsyncStorage.removeItem('@TrendingThingsStore:userId')
    } catch(err) {
        return new Error();
    }
}