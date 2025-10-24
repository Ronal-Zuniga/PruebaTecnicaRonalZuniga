import { View, StyleSheet } from "react-native";
import { ImageContainer } from "../atoms/ImageContainer";
import { InfoContainer } from "../atoms/InfoContainer";
import { MovieSimplified } from "../../../entities/interfaces/movie";

interface props {
    movie: MovieSimplified
}

export const MovieComponent = ({ movie }: props) => {
    return (
        <View style={styles.container}>
            <ImageContainer image={movie.poster_path} />
            <InfoContainer title={movie.title} date={movie.release_date} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
});
