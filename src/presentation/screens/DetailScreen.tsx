import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"
import { RootStackParams } from "../../entities/types/navigationParams";
import { SafeAreaView } from "react-native-safe-area-context";

export const DetailScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    return (
        <SafeAreaView>
            <Text>Detail Screen</Text>
            <Button
                onPress={() => navigation.navigate("Home")}
                title="Back to home"
                color="green"
            />
        </SafeAreaView>
    )
}