from typing import List
from pydantic import ValidationError
from .schemas import MCQResponse, Question
from .quiz_genearator import MCQGenerator


class QuestionPipeline:
    def __init__(self, text_chunks: List[str]):
        """Initializes text chunks."""
        self.text_chunks = text_chunks
        self.mcq_generator = MCQGenerator()

    def process(self) -> List[Question]:
        """Orchestrates the entire process of loading the PDF, chunking, and generating MCQs."""
        # Step 1: Generate MCQs for each chunk and aggregate the results
        all_questions = []
        for chunk in self.text_chunks:
            mcq_response = self.mcq_generator.generate_mcqs(chunk)
            if not isinstance(mcq_response, dict):
                continue
            if "questions" not in mcq_response.keys():
                continue
            if not isinstance(mcq_response.get("questions"), list):
                continue

            for question in mcq_response.get("questions"):
                if not isinstance(question, dict):
                    continue

                try:
                    # Validate question data
                    _ = Question(**question)
                    all_questions.append(question)
                except ValidationError as ve:
                    print("Validation Error:", ve)

        # Step 2: Return the aggregated MCQ response
        return all_questions
