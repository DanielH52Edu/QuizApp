import { Image, Text, View, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Result {
    image: string | null;
    id: string;
    title: string;
    description: string;
    result_desc: string;
}

interface ResultListItemProps {
    result: Result;
}

type RootStackParamList = {
    Home: undefined;
    ResultScreen: { id: string }; //Maybe?
};

export default function ResultListItem({ result }: ResultListItemProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: result.image === null ? 'https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1280&q=60&fm=webp' : quiz.image }}
                style={styles.image}
            />
            <View style={styles.bar}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{result.title}</Text>
                    <Text style={styles.description}>{result.description}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: '95%',
        height: 130,
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        width: '95%',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});