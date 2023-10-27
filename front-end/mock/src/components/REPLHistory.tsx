import '../styles/main.css';
import {ReactElement, useRef} from "react";

interface REPLHistoryProps{
    history: ReactElement[]
}
export function REPLHistory(props : REPLHistoryProps) {
    const commandHistory = useRef<HTMLDivElement>(null)
    const index = useRef<number>(-1)

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const historyLength = props.history.length
        let i = index.current;
        if(event.key == "ArrowUp") {
            i = Math.max(0, i - 1)
        }
        else if(event.key == "ArrowDown") {
            i = Math.min(historyLength - 1, i + 1)
        }
        index.current = i
        if(commandHistory.current) {
            const child = commandHistory.current.children;
            if (child) {
                for (let j = 0; j < child.length; j++) {
                    const item = child[j] as HTMLElement;
                    if (item) {
                        item.focus()
                    }
                }
            }
        }
    }

    return (
        <div className="repl-history" ref={commandHistory}
             id="Command History"
             onKeyDown={handleKeyPress} tabIndex={0} role="listbox" aria-live="polite">
            {props.history.map((command, i) =>
                <p key={i} role="option" aria-selected="false">{command}</p>)}
        </div>
    );
}