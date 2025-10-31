from venv import create
from app import db
from sqlalchemy import ForeignKey, Identity


class Order(db.Model):
    __tablename__ = "orders"
    order_id = db.Column(db.Integer, Identity(), primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.user_id"), nullable=False)
    product_id = db.Column(
        db.Integer, ForeignKey("products.product_id"), nullable=False
    )
    order_created_at = db.Column(db.String(50), nullable=False)
    order_status = db.Column(db.String(50), nullable=False, default="pending")
    order_delivry = db.Column(db.Boolean, nullable=False, default=False)
    order_qty = db.Column(db.Integer, nullable=False, default=1)
    order_delivry_address = db.Column(db.String(255), nullable=True)
    order_updated_at = db.Column(db.String(50), nullable=True)
    user = db.relationship("User", back_populates="orders")
    products = db.relationship("Product", back_populates="order")

    def to_dict(self):
        return {
            "order_id": self.order_id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "order_created_at": self.order_created_at,
            "order_status": self.order_status,
            "order_delivry": self.order_delivry,
            "order_qty": self.order_qty,
            "order_delivry_address": self.order_delivry_address,
            "order_updated_at": self.order_updated_at,
        }
