import {AsyncStorage} from 'react-native';

class TokenService {

    static async getToken() {
        return await AsyncStorage.getItem('usuario');
    }
}

export { TokenService };