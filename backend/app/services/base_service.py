from abc import ABC, abstractmethod


class Base_service(ABC):
    @abstractmethod
    def create(self, form):
        pass
