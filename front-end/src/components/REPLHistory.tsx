import { ReactElement } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';

/**
 * This interface contains the history prop which is the command history as react elements
 */
interface REPLHistoryProps{
    history: ReactElement[];
}

/**
 * This functions keeps track of the history and keeps it displayed as a list on screen
 * @param props is just the command history
 * @returns the command history and outputs on screen
 */
export function REPLHistory(props : REPLHistoryProps) {

    return (
        <div className="repl-history" aria-label="Command history">
            {props.history.map((command, index) => (
              <ul key={index}>{command}</ul>
            ))}
        </div>
      );
}