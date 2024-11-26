from typing import Union, List
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from .base import DocLoaderABC


class PDFLoader(DocLoaderABC):
    def __init__(
        self, path: Union[str, List[str]], chunk_size: int = 1000, overlap: int = 200
    ):
        self.path = path
        self.chunk_size = chunk_size
        self.overlap = overlap

    def load(self) -> str:
        """
        Load text from PDF document.
        """
        if isinstance(self.path, list):
            all_doc_text = ""
            for p in self.path:
                loader = PyPDFLoader(p)
                documents = loader.load()
                all_doc_text += " ".join([doc.page_content for doc in documents])
                all_doc_text += " "  # Add space after adding new content
            return all_doc_text.rstrip().lstrip()

        loader = PyPDFLoader(self.path)
        documents = loader.load()
        return " ".join([doc.page_content for doc in documents])

    def chunk_text(self, text: str) -> List[str]:
        """
        Chunk text into smaller pieces for LLM processing
        """
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size, chunk_overlap=self.overlap
        )
        return splitter.split_text(text)
