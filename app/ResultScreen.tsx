import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { getResult } from '@/app/utils/QuizData';

interface Quiz {
    image: string | null;
    id: string;
    title: string;
    description: string;
}

interface Result {
    id: number;
    quiz: string;
    name: string;
    description: string;
    value: number;
}

interface RootStackParamList extends ParamListBase {
    ResultScreen: {
        quiz: string;
        score: number;
    };
}

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'ResultScreen'>;

export default function ResultScreen() {
    const route = useRoute<ResultScreenRouteProp>();
    const { quiz, score } = route.params;
    const [result, setResult] = useState<Result | null>(null);

    const parsedQuiz: Quiz = JSON.parse(quiz);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const r = await getResult(parsedQuiz.id, score);
                setResult(r);
            } catch (error) {
                console.error(error);
            }
        };

        fetchResult();
    }, [parsedQuiz.id, score]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{parsedQuiz.title}</Text>
            <Text style={styles.description}>{parsedQuiz.description}</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            {result && (
                <>
                    <Text style={styles.title}>{result.name}</Text>
                    <Text style={styles.description}>{result.description}</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    score: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
    },
});