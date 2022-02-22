import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import mpld3

matplotlib.use("Agg")


def plot_raw(raw, path):
    raw.plot(show_scrollbars=False, scalings=dict(eeg=20e-5))
    plt.savefig(path)


def mean_plot(raw):
    # get the data for plotting in a short time interval from 10 to 20 seconds
    data, times = raw.get_data(picks="all", return_times=True)

    # Scale the data from the MNE internal unit V to µV
    data *= 1e6
    # Take the mean of the channels
    mean = np.mean(data, axis=0)
    # make a figure
    fig, ax = plt.subplots()
    # plot some EEG data
    ax.plot(times, mean)
    # add axis labels, and adjust bottom figure margin to make room for them
    ax.set(xlabel="Time (s)", ylabel="Amplitude (µV)")
    return mpld3.fig_to_dict(fig)


def plot_figure(raw, filtered=None):
    if filtered == None:
        plot_raw(raw, "../frontend/src/assets/images/raw.png")
        return mean_plot(raw)
    else:
        plot_raw(filtered, "../frontend/src/assets/images/filtered.png")
        return (
            "../assets/images/raw.png",
            "../assets/images/filtered.png",
        )
