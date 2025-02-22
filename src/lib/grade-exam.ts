export type Result = {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}[];

const convertToRecord = (
  array: Record<string, string>[]
): Record<string, string> => {
  return array.reduce(
    (acc, { question, answer }) => {
      acc[question] = answer;
      return acc;
    },
    {} as Record<string, string>
  );
};

function gradeExam(
  correctAnswersInput: Record<string, string>[],
  studentAnswersInput: Record<string, string>[]
) {
  try {
    const correctAnswers = convertToRecord(correctAnswersInput);

    const studentAnswers = convertToRecord(studentAnswersInput);
    const result: Result = Object.keys(correctAnswers).map((question) => {
      const correctAnswer = correctAnswers[question] || "";
      const studentAnswer = studentAnswers[question] || "";
      return {
        question,
        studentAnswer,
        correctAnswer,
        isCorrect: studentAnswer === correctAnswer,
      };
    });
    return result;
  } catch (error) {
    console.error("Lỗi khi chấm bài:", error);
    return [];
  }
}

export default gradeExam;
