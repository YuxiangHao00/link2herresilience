"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

WSGI application server for flask RESTful API endpoints for ML applications
"""

from yoga_asana import app6
from lifestyle_risk import app7

if __name__ == "__main__":
    app6.run(host="0.0.0.0", port=5007)
    app7.run(host="0.0.0.0", port=5008)
