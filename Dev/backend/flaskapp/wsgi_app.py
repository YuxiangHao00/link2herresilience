"""
FIT5120: IE Studio experience project
Project: Link2 HerResilience
Team: Harmony (TA18)
Author: Mandeep Singh

WSGI application server for flask RESTful API endpoints
"""

from media_files_app import app0
from air_quality import app2_1
from allergic_pollen import app2_2
from sleep_pattern import app3__2_3
from health_education import app4
from yoga_asana import app6

if __name__ == "__main__":
    app0.run(host="0.0.0.0", port=5010)
    app2_1.run(host="0.0.0.0", port=5001)
    app2_2.run(host="0.0.0.0", port=5002)

    app3__2_3.run(host="0.0.0.0", port=5004)

    app4.run(host="0.0.0.0", port=5005)

    app6.run(host="0.0.0.0", port=5007)
