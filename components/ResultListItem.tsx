import { Image, Text, View, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { getQuizById } from "@/app/utils/QuizData";

interface Result {
    quizId: string;
    result: {
        id: number;
        quiz: string;
        name: string;
        description: string;
        value: number;
    };
}

interface ResultListItemProps {
    result: Result;
}

type RootStackParamList = {
    Home: undefined;
    ResultScreen: { id: string };
};

interface Quiz {
    image: string | null;
    id: string;
    title: string;
    description: string;
}

export default function ResultListItem({ result }: ResultListItemProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        const getQuizData = async () => {
            try {
                const quizData = await getQuizById(result.quizId);
                setQuiz(quizData);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        getQuizData();
    }, [result.result.id]);

    if(!quiz) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: quiz.image ?? 'https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1280&q=60&fm=webp' }}
                style={styles.image}
            />
            <View style={styles.bar}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{result.result.name}</Text>
                    <Text style={styles.description}>{result.result.description}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        width: '100%',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});