import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { RouteProp, useRoute, useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParams } from "../../entities/types/navigationParams";
import { MovieDetailSimplified } from "../../entities/interfaces/movie.detail";
import { getMovieDetail } from "../../connection/request/htpp.request";

type DetailScreenRouteProp = RouteProp<RootStackParams, 'Detail'>;

export const DetailScreen = () => {
    const route = useRoute<DetailScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { movieId } = route.params;

    const [movie, setMovie] = useState<MovieDetailSimplified | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        loadMovieDetail();
    }, []);

    const loadMovieDetail = async () => {
        try {
            setLoading(true);
            const data = await getMovieDetail({ movieId });
            setMovie(data);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading movie detail");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error || !movie) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>{error || "Movie not found"}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Home</Text>
            </Pressable>
            <ScrollView>
                <Image
                    source={{ uri: movie.poster_path }}
                    style={styles.poster}
                    resizeMode="cover"
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.rating}>Rating Promedio: {movie.vote_average.toFixed(1)}</Text>
                    <Text style={styles.overviewTitle}>Overview</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: 'absolute',
        top: 35,
        left: 10,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    poster: {
        width: '100%',
        height: 500,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rating: {
        fontSize: 18,
        marginBottom: 20,
    },
    overviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
});