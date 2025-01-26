from typing import Union, List
from langchain_community.document_loaders import (
    PyPDFLoader,
    UnstructuredWordDocumentLoader,
    UnstructuredMarkdownLoader,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter

from .base import DocLoaderABC, ChunkerABC


class Chunker(ChunkerABC):
    def __init__(self, chunk_size: int, overlap: int):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str) -> List[str]:
        """
        Chunk text into smaller pieces for LLM processing
        """
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size, chunk_overlap=self.overlap
        )
        return splitter.split_text(text)


class PDFLoader(DocLoaderABC, Chunker):
    def __init__(
        self, path: Union[str, List[str]], chunk_size: int = 1000, overlap: int = 200
    ):
        super().__init__(chunk_size=chunk_size, overlap=overlap)
        self.path = path

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


class WordDocLoader(DocLoaderABC, Chunker):
    def __init__(
        self, path: Union[str, List[str]], chunk_size: int = 1000, overlap: int = 200
    ):
        super().__init__(chunk_size=chunk_size, overlap=overlap)
        self.path = path

    def load(self) -> str:
        """
        Load text from Word document.
        """
        if isinstance(self.path, list):
            all_doc_text = ""
            for p in self.path:
                loader = UnstructuredWordDocumentLoader(p)
                documents = loader.load()
                all_doc_text += " ".join([doc.page_content for doc in documents])
                all_doc_text += " "  # Add space after adding new content
            return all_doc_text.rstrip().lstrip()

        loader = UnstructuredWordDocumentLoader(self.path)
        documents = loader.load()
        return " ".join([doc.page_content for doc in documents])


class MarkdownDocLoader(DocLoaderABC, Chunker):
    def __init__(
        self, path: Union[str, List[str]], chunk_size: int = 1000, overlap: int = 200
    ):
        super().__init__(chunk_size=chunk_size, overlap=overlap)
        self.path = path

    def load(self) -> str:
        """
        Load text from Markdown document.
        """
        if isinstance(self.path, list):
            all_doc_text = ""
            for p in self.path:
                loader = UnstructuredMarkdownLoader(p)
                documents = loader.load()
                all_doc_text += " ".join([doc.page_content for doc in documents])
                all_doc_text += " "  # Add space after adding new content
            return all_doc_text.rstrip().lstrip()

        loader = UnstructuredMarkdownLoader(self.path)
        documents = loader.load()
        return " ".join([doc.page_content for doc in documents])
