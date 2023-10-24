import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * This interface makes an input require a value set value and ariaLabel
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }
  
  /**
   * This function deals with making a controlled input box
   * @param props props for class
   * @returns the command box displayed on screen
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }