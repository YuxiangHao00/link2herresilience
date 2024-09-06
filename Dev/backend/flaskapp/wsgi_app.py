"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

WSGI application server for flask RESTful API endpoints
"""

from air_quality import app2_1
from allergic_pollen import app2_2

if __name__ == "__main__":
    app2_1.run(host="0.0.0.0", port=5001)
    app2_2.run(host="0.0.0.0", port=5002)
