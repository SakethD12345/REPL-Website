export interface REPLFunction {
  (args: string[]): Promise<string[][]>
}
export const REPLFunctionMap = new Map<string, REPLFunction>
REPLFunctionMap.set("load_file", load)
REPLFunctionMap.set("view", view)
REPLFunctionMap.set("search", search)
async function load(inputArray: string[]) {
  let fp = inputArray[1]
  return await fetch(
      "http://localhost:2323/loadcsv?filepath=" + fp + "&header=false"
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

async function view(inputArray: string[]) {
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

async function search(inputArray: string[]) {
  let val = inputArray[1]
  let col = inputArray[2]
  return await fetch("http://localhost:2323/searchcsv?find=" + val + "&col=" + col)
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