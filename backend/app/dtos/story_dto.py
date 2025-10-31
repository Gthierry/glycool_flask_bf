from dataclasses import dataclass
from app.models.story import Story

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto


@dataclass
class StoryDto(AbstractDto):

    def __init__(self, Story: Story):
        self.id = Story.story_id

        self.title = Story.story_title

        self.body = Story.story_body

        self.image = Story.story_image

    def serialize(self):

        dto = deepcopy(self)

        return dto.__dict__
