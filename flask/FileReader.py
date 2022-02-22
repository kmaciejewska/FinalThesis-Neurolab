import mne
import os
from pathlib import Path
from werkzeug.utils import secure_filename
import pandas as pd
import flask
import matplotlib
import matplotlib.pyplot as plt
import numpy as np

matplotlib.use("Agg")
matplotlib.rcParams["toolbar"] = "None"

import mpld3

BASE_DIR = Path(__file__).resolve().parent


class FileReader:
    def __init__(self, raw=None, current_file=None):
        self._current_file = current_file
        self._ALLOWED_EXTENSIONS = {
            "edf": mne.io.read_raw_edf,
            "gdf": mne.io.read_raw_gdf,
            "fif": mne.io.read_raw_fif,
            "vhdr": mne.io.read_raw_brainvision,
            "bdf": mne.io.read_raw_bdf,
            "cnt": mne.io.read_raw_cnt,
            "set": mne.io.read_raw_eeglab,
        }
        self._media_folder = os.path.join(BASE_DIR, "media")
        self.raw = raw

    # getter methods
    def get_current_file(self):
        return self._current_file

    def get_allowed_extensions(self):
        return list(self._ALLOWED_EXTENSIONS.keys())

    def get_target(self, file):
        return "/".join([self._media_folder, file])

    # setter method
    def set_current_file(self, file):
        self._current_file = file

    def save_file(self, file):
        if not os.path.isdir(self._media_folder):
            os.mkdir(self._media_folder)

        filename = secure_filename(file.filename)
        # split the extension from the path and normalise it to lowercase
        ext = filename.split(".")[1].lower()
        if ext in list(self._ALLOWED_EXTENSIONS.keys()):
            self.set_current_file(filename)
            file.save(self.get_target(filename))
            return True
        else:
            return False

    def read_raw(self):
        extension = self._current_file.split(".")[1].lower()
        # map the key to method in the ALLOWED_EXTENSIONS dictionary
        # preload is set to true becuase mne by default does not load the file into memory
        # and we need it in the memory for preprocessing
        self.raw = self._ALLOWED_EXTENSIONS[extension](
            self.get_target(self._current_file), preload=True
        )

        # bdf files require setting the reference
        # default: average
        if extension == "bdf":
            self.raw.set_eeg_reference()

        try:
            # store only eeg channels
            # exclude channels marked as bad (if any) - done by default
            eeg_indices = mne.pick_types(self.raw.info, eeg=True, eog=True, ecg=True)
            mne.pick_info(self.raw.info, eeg_indices)["nchan"]
            [
                self.raw.drop_channels(channel)
                for channel in self.raw.ch_names
                for substring in [
                    "LOC",
                    "EKG",
                    "ROC",
                ]  # drop weird ekg loc and roc channels
                if substring in channel
            ]
            info_object = {
                "Number of EEG channels": len(eeg_indices),
                "Channel names": self.raw.info.get("ch_names"),
                "Date of Measurement": self.raw.info.get("meas_date"),
                "Sampling frequency (Hz)": self.raw.info.get("sfreq"),
                "Highpass filter (Hz)": self.raw.info.get("highpass"),
                "Lowpass filter (Hz)": self.raw.info.get("lowpass"),
            }
            return info_object

        except ValueError:
            return "No EEG channels detected"

    def plot_raw(self):
        # get the data for plotting in a short time interval from 10 to 20 seconds
        # start = int(self._raw.info["sfreq"] * 10)
        # stop = int(self._raw.info["sfreq"] * 20)
        # data, times = self._raw.get_data(picks="all", return_times=True)

        # Scale the data from the MNE internal unit V to µV
        # data *= 1e6
        # data.T
        # Take the mean of the channels
        # mean = np.mean(data, axis=0)
        # make a figure
        # fig, ax = plt.subplots(figsize=(9, 6))
        # plot some EEG data
        # ax.plot(data)
        # fig, ax = plt.subplots()
        # fig.canvas.draw()

        fig = plt.figure()
        fig.canvas.draw()
        fig = self.raw.plot(show_scrollbars=False)
        fig.canvas.draw()
        return mpld3.fig_to_dict(fig)
