from typing import Union, List
from abc import ABC, abstractmethod


class DocLoaderABC(ABC):
    @abstractmethod
    def __init__(
        self, path: Union[str, List[str]], chunk_size: int = 1000, overlap: int = 200
    ): ...

    @abstractmethod
    def load(self) -> str: ...

    @abstractmethod
    def chunk_text(self, text: str) -> List[str]: ...