import '../styles/main.css';
import {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { mockData } from '../mockedJson';

interface REPLInputProps{
  history: ReactElement[]
  setHistory: Dispatch<SetStateAction<ReactElement[]>>
  mode: string
  setMode: Dispatch<SetStateAction<string>>
  fileData: string[][]
  setFileData: Dispatch<SetStateAction<string[][]>>
  isLoaded: boolean
  setIsLoaded: Dispatch<SetStateAction<boolean>>
  hasHeader: boolean
  setHasHeader: Dispatch<SetStateAction<boolean>>
}
/**
 * This function deals with the repl inputs especially when a button is clicked
 * @param props are the parameters needed to track between submits such as history, mode, fileData, isLoaded, hasHeader
 * @returns the output is what will be displayed on screen using html tables
 */
export function REPLInput(props : REPLInputProps) {
    
    // Used to reset the command string in the box every click
    const [commandString, setCommandString] = useState<string>("");
      
    /**
     * This function handles when a command string is submitted through the submit button and displays what should displayed
     * @param commandString 
     */
    function handleSubmit(commandString: string) {
      var inputArray = commandString.split(" ")
      var finalOutput;
      var currentMode = props.mode;
      var keyWord = inputArray[0]
      var returnTable = (<table><tr><td></td></tr></table>)
      // Deals with switching the mode between brief and verbose
      if (keyWord == "mode") {
        var newMode = "brief";
        if (props.mode == "brief") {
          newMode = "verbose";
        }
        currentMode = newMode
        props.setMode(newMode)
        // Outputs what the mode was switched to
        if(newMode == "brief") {
          finalOutput = [["Successfully switched to brief mode"]]
        }
        else {
          finalOutput = [["Successfully switched to verbose mode"]]
        }
      }
      // Deals with the load_file command with the filepath and header specification
      else if (keyWord == "load_file" && inputArray.length == 3) {
        var fileName = inputArray[1]
        var hasHeaderString = inputArray[2]
        finalOutput = load(fileName, hasHeaderString)
      }
      // Deals with the view command 
      else if(keyWord == "view" && inputArray.length === 1) {
        if(props.isLoaded) {
          // Checks if the file only has empty values or is completely empty
          fetch("http://localhost:2323/viewcsv")
          .then(r => r.json())
          .then(response =>{
            props.setFileData(response["data"])
          })
          if(checkIfFileEmpty()) {
            finalOutput = [["You are viewing an empty file"]]
          }
          else {
            finalOutput = props.fileData
          }
        }
        else {
          finalOutput = [["Please load a file before viewing it"]]
        }
      }
      // Deals with the search command
      else if(keyWord == "search") {
        finalOutput = search(inputArray)
      }
      // Any case that doesn't fit one of the valid commands is error handled here
      else {
        finalOutput = [["Please enter a valid command"]]
      }
      // Builds the html table that will be displayed
      if(commandString !== "") {
        var returnString = buildResultTable(finalOutput)
        returnTable = <div dangerouslySetInnerHTML={{ __html: returnString}}/>
        // Properly displays the output if the mode is verbose
        if(currentMode == "verbose") {
          returnTable = (<div><p>Command: <br></br>{commandString}{" "}</p><p>Output: {returnTable} </p></div>)
        }
        props.setHistory([...props.history, returnTable])
      }
      // Resets the command string
      setCommandString("");
    }
 
    /**
     * The load function deals with loading the filename and checking if the filepath 
     * @param fileName is the name of the file being loaded
     * @param hasHeaderString is the with_header or without_header string
     * @returns the output that shoudl be displayed
     */
    function load(fileName: string, hasHeaderString: string) {
      var output;
      if (hasHeaderString == "with_header") {
        props.setHasHeader(true)
      } else if (hasHeaderString == "without_header") {
        props.setHasHeader(false)
      } else {
        return [["Please enter a valid command"]]
      }

      fetch("http://localhost:2323/loadcsv?filepath=" + fileName + "&header=" + props.hasHeader.toString())
      .then(r => r.json())
      .then((response) => {
        props.setIsLoaded(response["result"] == "success")
      })
      .catch(e => console.log(e))

      if (props.isLoaded) {
        //props.setFileData(mockData.get(fileName) || [[]])
        output = [["Loaded file " + fileName + " successfully"]]
      } else {
        output = [["File " + fileName + " not found"]]
      }
      return output
    }

    /**
     * The function deals with searching the file given a column specification or not
     * @param inputArray is the input given by the user
     * @returns the output that should be displayed
     */
    function search(inputArray: string[]) {
      var finalOutput
      // Checks if the file has been loaded or not
      if(props.isLoaded) {
        // Checks if the file is empty or not
        if(checkIfFileEmpty()) {
          finalOutput = [["You are searching an empty file"]]
        }
        // Checks if the user didn't give a column specification
        else if(inputArray.length == 2) {
          if(props.hasHeader) {
            // Mock output for search
            finalOutput = [props.fileData[0], props.fileData[1]]
          }
          else {
            // Mock output for search
            finalOutput = [props.fileData[0]]
          }
        }
        // Checks if the user did give a column specification
        else if(inputArray.length == 3) {
          // Checks that a column specification can because there is a header
          if(props.hasHeader) {
            // Finds the specificied column in the header
            if(checkValueInHeader(inputArray[1], props.fileData[0])) {
              finalOutput = [props.fileData[0], props.fileData[1]]
            }
            else {
              finalOutput = [["The specified column is not present"]]
            }
          }
          else {
            finalOutput = [["Cannot search with a specified column on a file with no header"]]
          }
        }
        else {
          finalOutput = [["Please enter a valid command"]]
        }
      }
      else {
        finalOutput = [["Please load a file before searching it"]]
      }
      return finalOutput
    }
    
    /**
     * This function builds a html table given the fileData or just the output that should be displayed
     * @param result is the 2d string array that will be converted to a html table
     * @returns a html table as a string
     */
    function buildResultTable(result: string[][]) {
      var tableString = "<table>";
          for (const row of result) {
            let rowString = "<tr>";
            for (const value of row) {
              rowString += "<td>" + value + "</td>";
            }
            rowString += "</tr>";
            tableString += rowString;
          }
          tableString += "</table>";
          return tableString
    }

    /**
     * This function checks if the specified column is in the header of the file
     * @param value is the specified column
     * @param header is the header
     * @returns true if it's present and false otherwise
     */
    function checkValueInHeader(value: string, header: string[]) {
      // Checks if it is an index and not a string
      const numberValue = parseInt(value);
      // If it is a number it checks if it is in the range of the columns
      if(!isNaN(numberValue)) {
        if(numberValue >=0 && numberValue < header.length) {
          return true
        }
        else {
          return false
        }
      }
      // Checks if the string specification is in the header
      else {
        for(let i = 0; i < header.length; i++) {
          if(header[i] == value) {
            return true
          }
        }
        return false
      }
    }

    /**
     * This function checks if the file is empty or not
     * @returns true if it is empty and false otherwise
     */
    function checkIfFileEmpty() {
      if(props.fileData.length == 0) {
        return true
      }
      for(const row in props.fileData) {
        if(row.length > 0) {
          return false
        }
      }
      return true
    }
    
    /**
     * This part of the code calls onClick when the button is clicked and uses handleSubmit to display the output 
     * whenever the button is clicked
     */
    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString)}>Submit</button>
        </div>
    );
  }