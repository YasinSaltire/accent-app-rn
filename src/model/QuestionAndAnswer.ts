import Answer from "./Answer";
import Question from "./Question";

interface QnA {
  getQuestion(): Question;
  getAnswer(): Answer;
  setQuestion(q: Question): void;
  setAnswer(q: Answer): void;
}

class QuestionAndAnswer implements QnA {
  private question: Question;
  private answer: Answer;
  constructor(q: Question, a: Answer) {
    this.question = q;
    this.answer = a;
  }

  getQuestion(): Question {
    return this.question;
  }

  getAnswer(): Answer {
    return this.answer;
  }

  setQuestion(q: Question): void {
    this.question = q;
  }

  setAnswer(a: Answer): void {
    this.answer = a;
  }
}

export default QuestionAndAnswer;
