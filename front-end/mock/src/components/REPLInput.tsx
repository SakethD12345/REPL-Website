import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { map } from "./Parser";

//sets input props
interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  data: string[][] | undefined;
  setData: Dispatch<SetStateAction<string[][] | undefined>>;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

//exports REPLInput for outside use
export function REPLInput(props: REPLInputProps) {
  //declare functions and variables
  const [commandString, setCommandString] = useState<string>("");

  let [isBrief, setMode] = useState<boolean>(true);

  const [filePath, setFilePath] = useState<string>("");

  const [hasHeader, setHasHeader] = useState<string>("");
  let fp = "";
  let col;
  let val = "";

  //handleSubmit is run every time a button is pressed
  function handleSubmit(commandString: string) {
    var inputArray = commandString.split(" ");
    //when load_file is contained within the command line
    if (inputArray[0] == "load_file") {
      fp = inputArray[1];
      //check for validity
      let fileLoaded;
      fetch(
        "http://localhost:2323/loadcsv?filepath=" + fp + "&header=false"

        //props.hasHeader.toString()
      )
        .then((r) => r.json())
        .then((response) => {
          fileLoaded = response["result"] == "success";
          if (!fileLoaded) {
            //add to history
            props.setHistory([...props.history, "File not found!"]);
          } else {
            if (isBrief) {
              //add to history
              props.setHistory([...props.history, "File successfully loaded."]);
            } else {
              props.setHistory([
                ...props.history,
                "Command: " + commandString,
                "Output: " + fp + " successfully loaded",
              ]);
            }
            //props.setIsLoaded(fileLoaded);
            setFilePath(fp);
            //props.setData(map.get(fp));     FIX THIS
            fetch("http://localhost:2323/viewcsv")
              .then((r) => r.json())
              .then((response) => {
                props.setData(response["data"]);
              });
          }
        })
        .catch((e) => console.log(e));
      setCommandString("");
    }

    //if view is in the command line
    if (commandString.startsWith("view")) {
      if (filePath.length == 0) {
        props.setHistory([...props.history, "No file loaded!"]);
      } else {
        if (!isBrief && props.data) {
          //print all to history
          const newData = props.data.map((row) => row.toString());
          props.setHistory([
            ...props.history,
            "--------",
            "Command: " + commandString,
            "Output:",
            ...newData,
          ]);
        } else if (props.data) {
          //print brief to history
          const newData = props.data.map((row) => row.toString());
          props.setHistory([...props.history, "--------", ...newData]);
        }
      }
      setCommandString("");
    }

    if (commandString.startsWith("search")) {
      //set variables
      const searchTerms = commandString.split(" ");
      val = searchTerms[1];
      col = searchTerms[2];
      fetch("http://localhost:2323/searchcsv?find=" + val + "&col=" + col)
        .then((r) => {
          console.log(r);
          return r.json();
        })
        .then((response) => {
          const newData = response["data"].map((row: { toString: () => any }) =>
            row.toString()
          );
          if (!isBrief) {
            props.setHistory([
              ...props.history,
              "--------",
              "Command: " + commandString,
              "Output:",
              newData,
            ]);
          } else {
            props.setHistory([...props.history, "--------", newData]);
          }
        })
        .catch((e) => console.log(e));
      setCommandString("");
    }
  }

  function handleMode() {
    setMode(!isBrief);
  }

  /**
   * This function checks if the file is empty or not
   * @returns true if it is empty and false otherwise
   */
  function checkIfFileEmpty() {
    if (!props.data) {
      return true;
    } else {
      if (props.data.length == 0) {
        return true;
      }
      for (const row in props.data) {
        if (row.length > 0) {
          return false;
        }
      }
      return true;
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
      <button onClick={() => handleMode()}>
        {isBrief ? "Brief" : "Verbose"}
      </button>
    </div>
  );
}
