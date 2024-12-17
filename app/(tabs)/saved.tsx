import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
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



export default function SavedScreen() {
    return (
        <View>
            <Text style = {styles.title}>Saved Results</Text>
        </View>
    );

    const showResults = () => {
            const parsedQuiz: Quiz = JSON.parse(quiz);
            return (
                <View style={styles.container}>
                    {parsedQuiz.image && <Image source={{ uri: parsedQuiz.image }} style={styles.image} />}
                    <Text style={styles.title}>{parsedQuiz.title}</Text>
                    <Text style={styles.description}>{parsedQuiz.description}</Text>
                    <Text style={styles.score}>Your Score: {score}</Text>
                    {result && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultTitle}>{result.name}</Text>
                            <Text style={styles.resultDescription}>{result.description}</Text>
                        </View>
                    )}
                    {/* I know using @ts-ignore is a sin. I am sorry... ~Dan */}
                    {/* @ts-ignore */}
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    score: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
    },
    resultContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    resultDescription: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
});