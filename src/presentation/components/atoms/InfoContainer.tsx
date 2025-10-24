import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Text, StyleSheet, Pressable } from "react-native";
import { RootStackParams } from "../../../entities/types/navigationParams";

interface props {
    title: string;
    date: Date;
    movieId: number;
}

export const InfoContainer = ({ title, date, movieId }: props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    return (
        <Pressable style={styles.container}
            onPress={() => navigation.navigate('Detail', { movieId })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date.toString()}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    date: {
        fontSize: 14,
        textAlign: 'left'
    }
});