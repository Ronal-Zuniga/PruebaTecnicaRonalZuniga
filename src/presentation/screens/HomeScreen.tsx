import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"
import { RootStackParams } from "../../entities/types/navigationParams";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
            <Button
                onPress={() => navigation.navigate('Detail')}
                title="Go to details"
                color="red"
            />
        </SafeAreaView>
    )
}