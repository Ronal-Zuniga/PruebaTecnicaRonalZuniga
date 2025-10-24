import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, FlatList, ActivityIndicator, StyleSheet } from "react-native"
import { RootStackParams } from "../../entities/types/navigationParams";
import { useEffect, useState } from "react";
import { MovieSimplified } from "../../entities/interfaces/movie";
import { getPopularMovies } from "../../connection/request/htpp.request";
import { MovieComponent } from "../components/molecules/MovieComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [movies, setMovies] = useState<MovieSimplified[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await getPopularMovies({ page: 1 });
            setMovies(data);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading movies");
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

    if (error) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.listContainer}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieComponent movie={item} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    listContainer:{
        flex: 1
    }
});