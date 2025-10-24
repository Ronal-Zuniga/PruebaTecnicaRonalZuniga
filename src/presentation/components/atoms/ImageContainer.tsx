import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Pressable, View, Image, StyleSheet } from "react-native";
import { RootStackParams } from "../../../entities/types/navigationParams";

interface props {
    image: string;
    movieId: number;
    width?: number;
    height?: number;
}

export const ImageContainer = ({ image, movieId, width = 200, height = 300 }: props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <Pressable
            onPress={() => navigation.navigate('Detail', { movieId })}
            style={{
                width,
                height,
                marginHorizontal: 4,
                paddingBottom: 12,
                paddingHorizontal: 7,
            }}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 8,
    }
});