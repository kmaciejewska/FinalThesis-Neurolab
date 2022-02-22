import pandas as pd
import mne
import numpy as np


class FeatureExtractor:
    def __init__(self, processed_raw):
        self.processed_raw = processed_raw
        self.features = pd.DataFrame()
        self._bands = [[1, 4], [4, 8], [8, 12], [12, 30], [30, 70]]
        self.ch_names = self.processed_raw.info.get("ch_names")

    # calculate Welch's periodogram
    # get the mean for all frequencies in the band
    def mean_bandpower(self, raw_object, f_band):
        band = np.asarray(f_band)
        low, high = band

        # calculate welch
        psds, freqs = mne.time_frequency.psd_welch(raw_object, fmin=low, fmax=high)
        # transpose
        psds = psds.T

        # put into a dataframe
        psds = pd.DataFrame(psds, index=freqs)

        # get min max indexes of the band
        psds = psds.iloc[[0, -1]]

        # get the mean power for the band
        psds = psds.mean()

        return psds

    def extract_features(self):
        features = pd.DataFrame()
        for band in self._bands:
            band_power = self.mean_bandpower(self.processed_raw, band)
            features = pd.concat([features, band_power], axis=1, ignore_index=True)

        features.index = list(self.ch_names)
        return features
