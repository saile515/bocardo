import { init_game } from "./game/main";
import { useRef, useEffect } from "react";

function App() {
    const ref = useRef(null);

    useEffect(() => {
        init_game();
    }, []);

    return (
        <>
            <div>
                <canvas ref={ref} id="game_canvas"></canvas>
            </div>
        </>
    );
}

export default App;
