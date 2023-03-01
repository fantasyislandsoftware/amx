import React, { useState } from "react";
import Screen from "./components/Screen";
import { useTasks, useUpdate } from "./functions/main";
import { useScreenStore } from "./stores/screenStore";

export const App = () => {
  const [update, setUpdate] = useState(0);

  useTasks(update);
  useUpdate(setUpdate);

  const screens = useScreenStore.getState().screens;

  return (
    <>
      {screens.map((screen, key) => (
        <Screen key={key} props={screen.props} />
      ))}
    </>
  );
};

export default App;
