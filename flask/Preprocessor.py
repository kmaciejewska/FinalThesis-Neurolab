import numpy as np

DEFAULT_FREQS = {"l_freq": 0.1, "h_freq": 50}

L_FREQS = [0.05, 0.1, 0.2, 0.3, 0.5, 1, 3, 5]
H_FREQS = [5, 15, 30, 50, 70, 100, 200]


class Preprocessor:
    def __init__(
        self,
        sfreq=None,
        raw=None,
        l_freq=DEFAULT_FREQS["l_freq"],
        h_freq=DEFAULT_FREQS["h_freq"],
    ):
        self.sfreq = sfreq
        self._l_freq = l_freq
        self._h_freq = h_freq
        self.raw_orig = raw
        self.filtered = None

    def get_allowed_freqs(self):
        return {
            "allowed_freqs": {
                "low_freqs": L_FREQS,
                "high_freqs": H_FREQS,
            },
            "default_freqs": DEFAULT_FREQS,
        }

    def set_filter_settings(self, l_freq, h_freq):
        self._l_freq = l_freq
        self._h_freq = h_freq

    def resample(self, raw):
        desired_sfreq = 250  # Hz
        decim = np.round(self.sfreq / desired_sfreq).astype(int)
        obtained_sfreq = self.sfreq / decim
        lowpass_freq = obtained_sfreq / 3.0
        raw = raw.filter(l_freq=None, h_freq=lowpass_freq)
        raw = raw.resample(sfreq=obtained_sfreq)
        return raw

    def filter(self):
        raw = self.raw_orig.copy()
        self.filtered = raw.filter(
            l_freq=self._l_freq, h_freq=self._h_freq, method="iir"
        )
        return self.raw_orig, self.filtered

    def reset(self):
        self.filtered = None
