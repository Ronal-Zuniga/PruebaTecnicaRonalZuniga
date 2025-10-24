import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, FlatList, ActivityIndicator, StyleSheet, TextInput, View, TouchableOpacity } from "react-native"
import { RootStackParams } from "../../entities/types/navigationParams";
import { useEffect, useState } from "react";
import { MovieSimplified } from "../../entities/interfaces/movie";
import { getPopularMovies, searchMovies } from "../../connection/request/htpp.request";
import { MovieComponent } from "../components/molecules/MovieComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<MovieSimplified[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string>("");

    const {
        data: popularMovies = [],
        isLoading: isLoadingPopular,
        error: popularError
    } = useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: () => getPopularMovies({ page: 1 }),
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                setSearchResults([]);
                setSearchError("");
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const handleSearch = async () => {
        try {
            setIsSearching(true);
            const data = await searchMovies({ query: searchQuery, page: 1 });
            setSearchResults(data);
            setSearchError("");
        } catch (err) {
            setSearchError(err instanceof Error ? err.message : "Error al buscar películas");
        } finally {
            setIsSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const isSearchMode = searchQuery.trim().length > 0;
    const movies = isSearchMode ? searchResults : popularMovies;
    const loading = isSearchMode ? isSearching : isLoadingPopular;
    const error = isSearchMode ? searchError : (popularError instanceof Error ? popularError.message : "");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar películas..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={handleClearSearch}
                    >
                        <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>
            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : movies.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.noResultsText}>No se encontraron películas</Text>
                </View>
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieComponent movie={item} />}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        position: 'relative',
    },
    searchInput: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingRight: 45,
        fontSize: 16,
    },
    clearButton: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -12 }],
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        fontSize: 20,
        color: '#666',
        fontWeight: 'bold',
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
    noResultsText: {
        fontSize: 16,
        color: "#666",
    },
    listContainer:{
        flex: 1
    }
});