import '../styles/main.css';
import {ReactElement} from "react";

interface REPLHistoryProps{
    history: ReactElement[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history" aria-label="Command History">
            {props.history.map((command, index) => <p>{command}</p>)}
        </div>
    );
}