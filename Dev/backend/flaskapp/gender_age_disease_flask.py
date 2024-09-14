from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
api = Api(app, prefix="/disease_data/v1")
CORS(app, resources={r"/*": {"origins": "*"}})

def connect_db():
    return psycopg2.connect(
        dbname="postgres",
        user="ta18",
        password="ta18main!",
        host="52.64.228.95",
        port="5432"
    )

class DiseasePrevalence(Resource):
    def get(self):
        age_group = request.args.get('ageGroup')
        gender = request.args.get('gender')

        conn = connect_db()
        cur = conn.cursor()

        query = """
        SELECT hc.health_condition_name, SUM(p.count) as total_count
        FROM population_health_condition p
        JOIN health_condition hc ON p.health_condition_id = hc.health_condition_id
        JOIN age_group ag ON p.age_group_id = ag.age_group_id
        WHERE ag.age_group = %s AND p.gender = %s
        GROUP BY hc.health_condition_name
        ORDER BY total_count DESC;
        """

        cur.execute(query, (age_group, gender))
        results = cur.fetchall()

        cur.close()
        conn.close()

        return jsonify(results)

api.add_resource(DiseasePrevalence, '/get_disease_prevalence')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
