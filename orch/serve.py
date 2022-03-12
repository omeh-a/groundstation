"""
The backend server used by all modules to communicate.
"""
from json import dumps
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import api as apis

app = Flask(__name__)
CORS(app)


@app.route('/whats_up')
def whats_up_request():
    """
    An internal endpoint that resolves to the N2YO What's up? API.
    """
    observer_lat = request.args.get('observer_lat', 33.8688)
    observer_lng = request.args.get('observer_lng', 151.2093)
    observer_alt = request.args.get('observer_alt', 3)
    search_radius = request.args.get('search_radius', 75)
    category_id = request.args.get('category_id', 0)
    api_result = apis.get_whats_up(
        observer_lat, observer_lng, observer_alt, search_radius, category_id)
    return return_handler(api_result)


@app.route('/radiopasses')
def radiopass_request():
    """
    An internal endpoint that resolves to the N2YO Get radio passes API.
    """
    norad_id = request.args.get('norad_id', 25544)
    observer_lat = request.args.get('observer_lat', 33.8688)
    observer_lng = request.args.get('observer_lng', 151.2093)
    observer_alt = request.args.get('observer_alt', 3)
    days = request.args.get('days', 7)
    min_elevation = request.args.get('min_elevation', 15)
    api_result = apis.get_radiopasses(
        norad_id, observer_lat, observer_lng, observer_alt, days, min_elevation)
    return return_handler(api_result)


def return_handler(api_result):
    """
    Processes input and produces error if required.
    """
    try:
        return jsonify(api_result)
    except TypeError:
        return Response(f'{{"Error": "{api_result}"}}', status=404, mimetype='application/json')


def default_handler(err):
    """
    The error handler for Flask exceptions.
    """
    response = err.get_response()
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response


app.config['TRAP_HTTP_EXCEPTIONS'] = True
app.register_error_handler(Exception, default_handler)


if __name__ == '__main__':
    app.run(debug=True, port=4999)