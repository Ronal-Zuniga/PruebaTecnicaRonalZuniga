import { Pressable, View, Image, StyleSheet } from "react-native";

interface props {
    image: string;
    width?: number;
    height?: number;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const ImageContainer = ({ image, width = 200, height = 300 }: props) => {
    const imageUrl = image.startsWith('http') ? image : `${IMAGE_BASE_URL}${image}`;

    return (
        <Pressable
            style={{
                width,
                height,
                marginHorizontal: 4,
                paddingBottom: 20,
                paddingHorizontal: 7,
            }}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: imageUrl }}
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