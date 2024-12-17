import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface QuizQuestion {
    id: number;
    quiz: string;
    text: string;
    question: string;
    options: Option[];
}

interface Option {
    id: number;
    option_text: string;
    weight: number;
    question: number;
}

interface QuestionProps {
    question: {
        id: number;
        quiz: string;
        text: string;
        question: string;
        options: Option[];
    };
    selectedOptionId: number | null;
    onOptionPress: (question: QuizQuestion, option: Option) => void;
}

const QuizQuestion: React.FC<QuestionProps> = ({ question, selectedOptionId, onOptionPress }) => {
    return (
        <View style={styles.questionBox}>
            <Text style={styles.questionTitle}>{question.question}</Text>
            <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.optionBox,
                            selectedOptionId === option.id && styles.selectedOptionBox,
                        ]}
                        onPress={() => onOptionPress(question, option)}
                    >
                        <Text style={styles.optionText}>{option.option_text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    questionBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    optionsContainer: {
        marginTop: 8,
    },
    optionBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    selectedOptionBox: {
        backgroundColor: '#cce5ff',
        borderColor: '#007bff',
    },
    optionText: {
        fontSize: 16,
    },
});

export default QuizQuestion;