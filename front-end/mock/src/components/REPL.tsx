import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

export default function REPL() {
  const [history, setHistory] = useState<string[]>([])
  const [data, setData] = useState<string[][] | undefined>();

  return (
    <div className="repl"> 
      <REPLHistory history ={history}/>
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} data={data} setData={setData}/>
    </div>
  );
}
