import "./App.scss"
import Left from "./components/left/left";
import Right from "./components/right/right";
import Player from "./components/player/player";
import SongState from "./context/songState";
import Particles from "@tsparticles/react";
function App() {
  return (
    <>
      <SongState>
        <main>
          <section>
            <Left></Left>
            <Right></Right>
            <Player></Player>
            <Particles id="particle"></Particles>
          </section>
        </main>
      </SongState>
    </>
  )
}

export default App;