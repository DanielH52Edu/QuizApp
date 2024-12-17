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

export async function getResult(quizId, score) {
    const {data, error} = await supabase.from('Result').select('*').eq('quiz', quizId).order('value', { ascending: false });
    if (error) {
        console.error('Error fetching results', error);
        return null;
    }

    for (let result of data) {
        if (score >= result.value) {
            return result;
        }
    }

    return null;
}

/* DAN (Dec, 2024)
    * This is gross, but it works.
    * Auth policies who?? We pray to god our keys don't leak!
 */
export async function submitQuizData(quiz) {
    try {
        let backgroundImageUrl = null;

        if (quiz.backgroundImage) {
            const file = quiz.backgroundImage;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            backgroundImageUrl = `https://nrmzlixopflnlxgqrsop.supabase.co/storage/v1/object/public/images/public/${fileName}`;
        }

        // QUIZ STUFF
        const { data: quizData, error: quizError } = await supabase
            .from('Quiz')
            .insert([{ creator: "Dan", title: quiz.title, description: quiz.description, image: backgroundImageUrl }])
            .select();

        if (quizError) throw quizError;

        const quizId = quizData[0].id;

        // QUESTION STUFF
        for (const question of quiz.questions) {
            const { error: questionError } = await supabase.rpc('insert_question', {
                quiz_id: quizId,
                question_text: question.question
            });

            if (questionError) throw questionError;

            const { data: questionData, error: fetchQuestionError } = await supabase
                .from('Question')
                .select('id')
                .eq('quiz', quizId)
                .eq('question', question.question);

            if (fetchQuestionError) throw fetchQuestionError;

            const questionId = questionData[0].id;

            // OPTION STUFF
            for (const option of question.options) {
                const { error: optionError } = await supabase
                    .from('Option')
                    .insert([{ question: questionId, option_text: option.text, weight: option.weight }]);

                if (optionError) throw optionError;
            }
        }

        // RESULT STUFF
        for (const result of quiz.results) {
            const { error: resultError } = await supabase
                .from('Result')
                .insert([{ quiz: quizId, name: result.name, description: result.description, value: result.value }]);

            if (resultError) throw resultError;
        }

        console.log('Quiz, questions, options, and results inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

export default function QuizData() {
    return (
        <Text>Error</Text>
    )
}