import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getQuizById, getQuestionsByQuizId, getOptions } from '@/app/utils/QuizData';

interface Quiz {
    image: string | null;
    id: string;
    title: string;
    description: string;
}

interface Question {
    id: string;
    text: string;
}

interface Option {
    id: string;
    option_text: string;
    weight: number;
}

export default function QuizScreen() {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [options, setOptions] = useState<{ [key: string]: Option[] }>({});

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizData = await getQuizById(id);
                setQuiz(quizData);

                const questionsData = await getQuestionsByQuizId(id);
                setQuestions(questionsData);

                const optionsData: { [key: string]: Option[] } = {};
                for (const question of questionsData) {
                    optionsData[question.id] = await getOptions(id, question.id);
                }
                setOptions(optionsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizData();
    }, [id]);

    if (!quiz) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Quiz not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{quiz.title}</Text>
            <Text style={styles.description}>{quiz.description}</Text>
            {questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.text}</Text>
                    {options[question.id]?.map((option) => (
                        <Text key={option.id} style={styles.optionText}>{option.option_text}</Text>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    questionContainer: {
        marginTop: 20,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
    },
});