import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNumbOfPass = async () => {
    try {
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
            const userData = JSON.parse(storedData);
            const numbOfPass = userData.passwords?.length || 0;
            return numbOfPass
        }
        return 0
    } catch (error) {
        console.error("Error getting number of passwords", error);
        return 0
    }
}