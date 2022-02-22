from joblib import load
import pandas as pd


class Classifier:
    def __init__(self, features):
        self._classifier = load("svm.joblib")
        self._data_x = features.values
        self._channel_names = list(features.index.values)

    def predict(self):
        predictions = self._classifier.predict(self._data_x)
        # get all predictions per channel
        output = pd.DataFrame(
            predictions, index=list(self._channel_names), columns=["label"]
        )
        # get channels that displayed ictal activity
        epi_channels = output.index[output["label"] == 1].tolist()
        # calculate prediction probability
        probability = self._classifier.predict_proba(self._data_x).max() * 100
        num_channels = len(output)
        return {
            "epi_channels": epi_channels,
            "probability": probability,
            "num_channels": num_channels,
        }
