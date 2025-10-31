from app import db
from sqlalchemy import Identity


class Product(db.Model):
    __tablename__ = "products"
    product_id = db.Column(db.Integer, primary_key=True)
    product_description = db.Column(db.String(255), nullable=False)
    product_name = db.Column(db.String(80), nullable=False)
    product_type = db.Column(db.String(50), nullable=False)
    product_created_at = db.Column(db.DateTime, server_default=db.func.now())
    product_stock = db.Column(db.Integer, nullable=False, default=0)
    product_stock_check = db.Column(db.Boolean, nullable=False, default=False)
    product_price = db.Column(db.Float(3, 2), nullable=False)
    product_tva = db.Column(db.Float(3, 2), nullable=False, default=21.00)
    order = db.relationship("Order", back_populates="products")

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "product_description": self.product_description,
            "product_name": self.product_name,
            "product_type": self.product_type,
            "product_created_at": self.product_created_at,
            "product_stock": self.product_stock,
            "product_stock_check": self.product_stock_check,
            "product_price": self.product_price,
            "product_tva": self.product_tva,
        }
