import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { submitQuizData } from '@/app/utils/QuizData';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

export default function CreateScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: [{ text: '', weight: 0 }] }]);
    const [results, setResults] = useState([{ name: '', description: '', value: 0 }]);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    const navigation = useNavigation();

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [{ text: '', weight: 0 }] }]);
    };

    const addOption = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push({ text: '', weight: 0 });
        setQuestions(newQuestions);
    };

    const addResult = () => {
        setResults([...results, { name: '', description: '', value: 0 }]);
    };

    const handleQuestionChange = (text: string, index: number) => {
        const newQuestions = [...questions];
        newQuestions[index].question = text;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (text: string, questionIndex: number, optionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].text = text;
        setQuestions(newQuestions);
    };

    const handleWeightChange = (weight: number, questionIndex: number, optionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].weight = weight;
        setQuestions(newQuestions);
    };

    const handleResultChange = (text: string, index: number, field: 'name' | 'description' | 'value') => {
        const newResults = [...results];
        if (field === 'value') {
            newResults[index][field] = Number(text);
        } else {
            newResults[index][field] = text;
        }
        setResults(newResults);
    };

    const handleSubmit = () => {
        const quizData = { title, description, questions, results, backgroundImage };
        submitQuizData(quizData);
        //Alert that the Submit was done Successfully
        //Send user to HomeScreen - navigation.navigate('(tabs)') somehow?
    };

    const handleFileChange = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                setBackgroundImage(response.assets[0].uri);
                //Alert Success
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Quiz</Text>
            <TextInput
                style={styles.input}
                placeholder="Quiz Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Select Background Image" onPress={handleFileChange} />
            {backgroundImage && <Image source={{ uri: backgroundImage }} style={styles.image} />}
            {questions.map((q, qIndex) => (
                <View key={qIndex} style={styles.questionContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Question ${qIndex + 1}`}
                        value={q.question}
                        onChangeText={(text) => handleQuestionChange(text, qIndex)}
                    />
                    <View style={styles.divider} />
                    {q.options.map((option, oIndex) => (
                        <View key={oIndex} style={styles.optionContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={`Option ${oIndex + 1}`}
                                value={option.text}
                                onChangeText={(text) => handleOptionChange(text, qIndex, oIndex)}
                            />
                            <TextInput
                                style={styles.weightInput}
                                placeholder="Weight"
                                keyboardType="numeric"
                                value={option.weight.toString()}
                                onChangeText={(text) => handleWeightChange(Number(text), qIndex, oIndex)}
                            />
                        </View>
                    ))}
                    <Button title="Add Option" onPress={() => addOption(qIndex)} />
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Add Question" onPress={addQuestion} />
            </View>
            <Text style={styles.title}>Results</Text>
            {results.map((result, rIndex) => (
                <View key={rIndex} style={styles.resultContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Result Name ${rIndex + 1}`}
                        value={result.name}
                        onChangeText={(text) => handleResultChange(text, rIndex, 'name')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={`Result Description ${rIndex + 1}`}
                        value={result.description}
                        onChangeText={(text) => handleResultChange(text, rIndex, 'description')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Value"
                        keyboardType="numeric"
                        value={result.value.toString()}
                        onChangeText={(text) => handleResultChange(text, rIndex, 'value')}
                    />
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Add Result" onPress={addResult} />
            </View>
            <Button title="Submit Quiz" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    questionContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    weightInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: 80,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    resultContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});