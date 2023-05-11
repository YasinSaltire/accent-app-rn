# accent-app-rn

1. write a function that takes as input a path to the json file and a number n
2. read the file contents
3. return an array of length n where each element corresponds to an object, obj in the db
4. filter out any object that doesn't have a region
5. shape of obj = {fileId: number, city: string, region: string, country: string, uri: string, attribute: string}


Game loop logic:

1. generate 10 correct choices in app.ts
2. pass in 10 correct choices and data into generateIncorrectChoices to return a list of correctchoices.length * 10 incorrect choices

3. For each index (representing question number):
    Pass in as props to protogamescreen
        handleanswerselection function
        correct question choice
        array of 3 incorrect choices    
4. In protogamescreen, randomly assign indices to the 4 choices passed in to populate buttons with text. 
5. Upon button press, call handleAnswerSelection and disableButton functions. Check whether the choice selected is correct or incorrect. If incorrect, disable the button. 
If correct, increment index in handleAnswerSelection, change state of incorrect choices to 
next 3 in array. 
6. Repeat until last question is shown. 
