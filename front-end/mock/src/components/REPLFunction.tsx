export interface REPLFunction {
  (args: string[]): Promise<string[][]>
}
export const REPLFunctionMap = new Map<string, REPLFunction>
REPLFunctionMap.set("load_file", load)
REPLFunctionMap.set("view", view)
REPLFunctionMap.set("search", search)
REPLFunctionMap.set("broadband", broadband)
async function load(inputArray: string[]) {
  if(inputArray.length==2) {
    let fp = inputArray[1]
    return await fetch(
        "http://localhost:2323/loadcsv?filename=" + fp + "&header=false"
        //props.hasHeader.toString()
    )
    .then((r) => r.json())
    .then((response) => {
      if (!(response["result"] == "success")) {
        //add to history
        return [["File " + fp + " not found"]]
      } else {
        return [["File " + fp + " successfully loaded"]]
      }
    })
  }
  else if(inputArray.length==3) {
    let fp = inputArray[1]
    let headerBoolean = inputArray[2] == "with_header"
    return await fetch(
        "http://localhost:2323/loadcsv?filename=" + fp + "&header=" + headerBoolean
        //props.hasHeader.toString()
    )
    .then((r) => r.json())
    .then((response) => {
      if (!(response["result"] == "success")) {
        // add to history
        return [["File " + fp + " not found"]]
      } else {
        return [["File " + fp + " successfully loaded"]]
      }
    })
  }
  else {
    return [["Not a valid load command"]]
  }
}

async function view(inputArray: string[]) {
  if(inputArray.length==1) {
    return await fetch("http://localhost:2323/viewcsv")
    .then((r) => r.json())
    .then((response) => {
      if(!(response["result"] == "success")) {
        return [["Please load a file before trying to view"]]
      }
      else {
        return response["data"];
      }
    });
  }
  else {
    return [["Not a valid view command"]]
  }
}

async function search(inputArray: string[]) {
  if(inputArray.length==2) {
    let val = inputArray[1].replace("_", "%20")
    return await fetch("http://localhost:2323/searchcsv?target=" + val)
    .then(r => r.json()
    )
    .then(response => {
      if(!(response["result"] == "success")) {
        return [["Invalid search attempt"]]
      }
      else {
        return response["data"]
      }
  })
  }
  else if(inputArray.length==3) {
    let val = inputArray[1].replace("_", "%20")
    let col = inputArray[2]
    return await fetch("http://localhost:2323/searchcsv?target=" + val + "&identifier=" + col)
    .then(r => r.json())
    .then(response => {
      if(!(response["result"] == "success")) {
        return [[response["error"]]]
      }
      else {
        return response["data"]
      }
    })
  }
  else {
    return [["Not a valid search command"]]
  }
}

async function broadband(inputArray: string[]) {
  if(inputArray.length==3) {
    let state = inputArray[1]
    let county = inputArray[2]
    return await fetch("http://localhost:2323/broadband?state=" + state + "&county=" + county)
    .then(r => r.json())
    .then(response => {
      if(!(response["result"] == "success")) {
        return [[response["error"]]]
      }
      else {
        return [["% Broadband Access: " + response["broadband"]]]
      }
    })
  }
  else {
    return [["Not a valid broadband command"]]
  }
}

