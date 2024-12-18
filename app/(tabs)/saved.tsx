import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ResultListItem from "@/components/ResultListItem";

interface SavedResult {
    quizId: string;
    result: {
        id: number;
        quiz: string;
        name: string;
        description: string;
        value: number;
    };
}

interface Quiz {
    image: string | null;
    id: string;
    title: string;
    description: string;
}

export default function SavedScreen() {
    const [savedResults, setSavedResults] = useState<SavedResult[]>([]);


    useEffect(() => {
        const fetchSavedResults = async () => {
            try {
                const savedResults = await AsyncStorage.getItem('savedResults');
                if (savedResults) {
                    setSavedResults(JSON.parse(savedResults));
                }
            } catch (error) {
                console.error('Error fetching saved results:', error);
            }
        };

        fetchSavedResults();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Results</Text>
            {savedResults.map((savedResult, index) => (
                <View key={index} style={styles.resultContainer}>
                    <ResultListItem result={savedResult} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    resultContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultDescription: {
        fontSize: 18,
        marginBottom: 10,
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});