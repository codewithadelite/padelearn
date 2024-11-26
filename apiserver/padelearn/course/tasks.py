from typing import Optional, List
from padelearn.tools.documents.loaders import PDFLoader
from padelearn.celery import app
from padelearn.ai.question.pipeline import QuestionPipeline

from .utils import save_questions_to_db, get_course_by_id, get_material_by_id


def _get_texts_from_document(path: str | List) -> List[str]:
    document = PDFLoader(path)
    document_text = document.load()
    return document.chunk_text(document_text)


@app.task
def generate_quiz_from_document(
    path: str | List, course_id: int, material_id: int, save: Optional[bool] = True
):
    """
    Generate quiz from document content passed.
    """
    chunk_text = _get_texts_from_document(path)

    # Log pdf content for debugging

    for text in chunk_text:
        print(text)

    pipeline = QuestionPipeline(chunk_text)
    questions_data = pipeline.process()

    # Log questions
    print(questions_data)

    if save:
        # Save questions into database
        course = get_course_by_id(course_id)
        material = get_material_by_id(material_id)
        save_questions_to_db(course, material, questions_data)
