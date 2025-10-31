from abc import ABC, abstractmethod


class AbstractDto(ABC):
    @abstractmethod
    def serialize(self):
        pass
