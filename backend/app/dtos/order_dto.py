from dataclasses import dataclass
from app.dtos.abstract_dto import AbstractDto
from copy import deepcopy
from app.models.order import Order


@dataclass
class OrderDto(AbstractDto):

    def __init__(self, Order: Order):
        self.id = Order.order_id
        self.user_id = Order.user_id
        self.product_id = Order.product_id
        self.status = Order.status
        self.created_at = Order.created_at
        self.updated_at = Order.updated_at
        self.qty = Order.order_qty
        self.delivry = Order.order_delivery
        self.delivry_address = Order.order_delivry_address

    def serialize(self):
        dto = deepcopy(self)
        return dto.__dict__
