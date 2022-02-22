from tkinter import ALL
import flask
import os
from flask_cors import CORS
from FileReader import FileReader
from Classifier import Classifier
from Preprocessor import Preprocessor
from FeatureExtractor import FeatureExtractor
from Plotter import plot_figure

app = flask.Flask(__name__)
cors = CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "127.0.0.1/:1",
            ]
        }
    },
)
app.config["CORS_HEADERS"] = "Content-Type"


file_reader = FileReader()
processor = Preprocessor()
app.config["UPLOAD_FOLDER"] = file_reader._media_folder


@app.route("/formats", methods=["GET"])
def get_allowable_formats():
    if flask.request.method == "GET":
        return flask.jsonify(file_reader.get_allowed_extensions())


@app.route("/upload", methods=["POST"])
def upload_file():
    if flask.request.method == "POST":
        file = flask.request.files["file"]
        if file_reader.save_file(file):
            processor.reset()
            info = file_reader.read_raw()
            plot = plot_figure(file_reader.raw)
            processor.raw_orig = file_reader.raw
            try:
                processor.sfreq = file_reader.raw.info["sfreq"]
            except KeyError:
                processor.sfreq = None
            return flask.jsonify(info=info, plot=plot)
        else:
            return flask.make_response("File format not allowed!", 400)


@app.route("/filter-settings", methods=["GET"])
def get_filter_settings():
    if flask.request.method == "GET":
        return flask.jsonify(processor.get_allowed_freqs())


@app.route("/preprocess", methods=["POST"])
def preprocess():
    if flask.request.method == "POST":
        if processor.sfreq == None:
            return flask.make_response(
                "Unable to preprocess - sample frequency not available!", 400
            )

        if processor.sfreq >= 600:
            resampled = processor.resample()
            file_reader.raw = resampled

        settings = flask.request.get_json(silent=True)
        if settings["default"] == False:
            processor.set_filter_settings(settings["low"], settings["high"])

        orig, filtered = processor.filter()
        orig_plot, filtered_plot = plot_figure(orig, filtered)
        return {"orig": orig_plot, "filtered": filtered_plot}


@app.route("/predict", methods=["GET"])
def predict():
    if flask.request.method == "GET":
        if processor.filtered == None:
            extractor = FeatureExtractor(file_reader.raw)
        else:
            extractor = FeatureExtractor(processor.filtered)
        features = extractor.extract_features()
        classifier = Classifier(features=features)
        return classifier.predict()


if __name__ == "__main__":
    app.run(debug=True)
