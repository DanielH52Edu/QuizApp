import supabase from "./Supabase";
import {Text} from "react-native";

export async function getAllQuizzes() {
    const {data, error} = await supabase.from('Quiz').select('*');
    if (error) {
        console.error('Error fetching quizzes', error);
        return [];
    }
    return data;
}

export async function getQuizById(id) {
    const {data, error} = await supabase.from('Quiz').select('*').eq('id', id);
    if (error) {
        console.error('Error fetching quiz', error);
        return null;
    }
    return data[0];
}

export async function getQuestionsByQuizId(quizId) {
    const {data, error} = await supabase.from('Question').select('*').eq('quiz', quizId);
    if (error) {
        console.error('Error fetching questions', error);
        return [];
    }
    return data;
}

export async function getOptions(questionId) {
    const {data, error} = await supabase.from('Option').select('*').eq('question', questionId);
    if (error) {
        console.error('Error fetching options', error);
        return [];
    }
    return data;
}

export async function getResults(quizId) {
    const {data, error} = await supabase.from('Result').select('*').eq('quiz', quizId);
    if (error) {
        console.error('Error fetching results', error);
        return [];
    }
    return data;
}

export default function QuizData() {
    return (
        <Text>Error</Text>
    )
}