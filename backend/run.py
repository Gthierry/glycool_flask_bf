import os
from app import app


raw_port = os.environ.get("PORT", "5000")

try:
    port = int(raw_port)
except ValueError:
    raise ValueError(
        f"Invalid PORT value: '{raw_port}'. Please set it to a valid integer."
    )

app.run(debug=True, host="0.0.0.0", port=port)
