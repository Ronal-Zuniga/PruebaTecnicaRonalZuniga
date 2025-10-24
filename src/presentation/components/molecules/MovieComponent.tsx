import { StyleSheet, Pressable } from "react-native";
import { ImageContainer } from "../atoms/ImageContainer";
import { InfoContainer } from "../atoms/InfoContainer";
import { MovieSimplified } from "../../../entities/interfaces/movie";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "../../../entities/types/navigationParams";

interface props {
    movie: MovieSimplified
}

export const MovieComponent = ({ movie }: props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const handlePress = () => {
        navigation.navigate('Detail', { movieId: movie.id });
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <ImageContainer image={movie.poster_path} movieId={movie.id} />
            <InfoContainer title={movie.title} date={movie.release_date} movieId={movie.id} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        marginHorizontal: 20,
        paddingVertical: 5,
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
