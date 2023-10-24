import { ReactElement, useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/**
 * This function calls REPL History and REPLInput and deals with the entire REPL
 * @returns the entire display
 */
export default function REPL() {
  const [history, setHistory] = useState<ReactElement[]>([]);
  const [mode, setMode] = useState<string>("brief");
  const [fileData, setFileData] = useState<string[][]>([[]]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasHeader, setHasHeader] = useState<boolean>(false);
  return (
    <div className="repl">  
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput history = {history} setHistory={setHistory} mode = {mode} setMode={setMode} 
      fileData = {fileData} setFileData={setFileData} isLoaded = {isLoaded} setIsLoaded={setIsLoaded} 
      hasHeader = {hasHeader} setHasHeader={setHasHeader}/>
    </div>
  );
}
