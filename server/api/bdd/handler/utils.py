from flask import json, jsonify


def makeResponse(json, status, isError=None):
    if (isError):
        return makeError(json, status)

    return jsonify({
        "data": json,
        "status": status
    }), status


def makeError(message, status):
    return jsonify({
        "error": message,
        "status": status
    }), status
