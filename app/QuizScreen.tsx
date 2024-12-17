import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { getQuizById, getQuestionsByQuizId, getOptions } from '@/app/utils/QuizData';
import QuizQuestion from '@/components/QuizQuestion';

interface Quiz {
    image: string | null;
    id: string;
    title: string;
    description: string;
}

interface Option {
    id: number;
    option_text: string;
    weight: number;
    question: number;
}

interface Question {
    id: number;
    quiz: string;
    text: string;
    question: string;
    options: Option[];
}

interface QuizResult {
    quiz: string;
    score: number;
}

type RootStackParamList = {
    QuizScreen: { id: string };
    ResultScreen: QuizResult;
};

export default function QuizScreen() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { id } = route.params as { id: string };
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: Option }>({});
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizData = await getQuizById(id);
                setQuiz(quizData);

                const questionsData = await getQuestionsByQuizId(id);
                const questionsWithOptions = await Promise.all(
                    questionsData.map(async (question) => {
                        const options = await getOptions(question.id);
                        return { ...question, options };
                    })
                );
                setQuestions(questionsWithOptions);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizData();
    }, [id]);

    const handleOptionPress = (question: Question, option: Option) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = {
                ...prevSelectedOptions,
                [question.id]: option,
            };

            let total = 0;
            for (let o of Object.values(newSelectedOptions)) {
                total += o.weight;
            }
            setScore(total);
            console.log('Score:', total);

            return newSelectedOptions;
        });
    };

    const handleSubmit = () => {
        if (quiz) {
            const result: QuizResult = { quiz: JSON.stringify(quiz), score };
            navigation.navigate('ResultScreen', result);
        }
    };

    if (!quiz) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Quiz not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{quiz.title}</Text>
            <Text style={styles.description}>{quiz.description}</Text>
            {questions.map((question) => (
                <QuizQuestion
                    key={question.id}
                    question={question}
                    selectedOptionId={selectedOptions[question.id]?.id || null}
                    onOptionPress={handleOptionPress}
                />
            ))}
            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
});