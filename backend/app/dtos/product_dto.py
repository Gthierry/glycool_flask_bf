from copy import deepcopy
from dataclasses import dataclass
from app.dtos.abstract_dto import AbstractDto
from app.models.product import Product


@dataclass
class ProductDto(AbstractDto):

    def __init__(self, product: Product):
        self.product_id = product.product_id
        self.product_description = product.product_description
        self.product_name = product.product_name
        self.product_type = product.product_type
        self.product_created_at = product.product_created_at.isoformat()
        self.product_stock = product.product_stock
        self.product_stock_check = product.product_stock_check
        self.product_price = product.product_price
        self.product_tva = product.product_tva


 def serialize(self):
        dto = deepcopy(self)
        return dto.__dict__
