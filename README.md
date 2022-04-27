## Neurolab

Worldwide, approximately 50 million people suffer from epilepsy, with truly anyone - regardless of their age, gender, ethnic background or geographic location - liable to developing the condition at any stage of their lives. The primary method to diagnose epilepsy is to perform an electroencephalogrpahy test, followed by a visual analysis of the reading. Naturally, as the physician must review pages of data, this becomes a very tedious and time-consuming task. 

Despite the research on possibility of applying Machine Learning techniques to raw EEG data being already quite substantial, there still lacks a simple and intuitive way for enabling the potential users to interact with the automated system without requiring them to posses highly specialised knowledge. Therefore, the main aim of this dissertation was to contribute, and possibly improve, the prevailing (manual) approach to the diagnosis of epilepsy.

Based on SVM classifier and spectral analysis of raw EEG data using Welch's periodogram and bandpass filtering, the application enables the users to visualize the plots of raw and preprocessed data, filter the signal and obtain a diagnosis in form of a list of epileptic EEG channels (if any).


## Installation and usage

1. Clone the repo
2. Run flask server:
  
`$ cd flask`

`$ flask run`

3. Install frontend dependencies and run the frontend application:

`cd frontend`

`npm install`

`npm start`


## Preview

![main](https://user-images.githubusercontent.com/73823898/165482137-29d60724-32ac-4e6e-9e8d-140e20cf65ef.png)

![drag](https://user-images.githubusercontent.com/73823898/165482039-4bf2f6b8-29fd-48ad-88cc-7c4f12bc4cfe.png)

![fileInfo](https://user-images.githubusercontent.com/73823898/165482065-05508bbd-bdc3-4c73-993f-6ab3bfa63a82.png)

![filter-override](https://user-images.githubusercontent.com/73823898/165482112-91cbdffc-69be-4773-a40d-df0d5d99cd05.png)

![filter-results](https://user-images.githubusercontent.com/73823898/165482292-d2dd999c-b20a-4206-8265-13004c742ce1.png)

![predict-ctal2](https://user-images.githubusercontent.com/73823898/165482312-6b79a2e0-a40a-48fe-92f6-cebbd9becf5b.png)
