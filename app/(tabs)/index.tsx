import {StyleSheet, View, ScrollView} from 'react-native';
import React from "react";
import {getAllQuizzes} from "@/app/utils/QuizData";
import QuizListItem from "@/components/QuizListItem";

export default function HomeScreen() {
    const [quizList, setQuizList] = React.useState<any[]>([]);

    React.useEffect(() => {
        let isMounted = true; // Add a flag to check if the component is mounted

        const fetchQuizzes = async () => {
            try {
                const quizzes = await getAllQuizzes();
                if (isMounted) {
                    setQuizList(quizzes);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();

        return () => {
            isMounted = false; // Cleanup function to set the flag to false
        };
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {quizList.map((quiz) => (
                <QuizListItem key={quiz.id} quiz={quiz}/>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});