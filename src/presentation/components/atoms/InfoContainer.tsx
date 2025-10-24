import { View, Text } from "react-native";

interface props{
    title: string;
    date: Date;
}

export const InfoContainer = ({title, date}: props) => {
    return(
        <View>
            <Text>{title}</Text>
            <Text>{date.toString()}</Text>
        </View>
    )
} 