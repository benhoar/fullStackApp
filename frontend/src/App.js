import TopBar from './components/navbar/TopBar'
import SideBar from './components/sidebar/SideBar'
// this is a hook called useState
// import { useState } from 'react'
// import { Switch, Route, Link } from 'react-router-dom'

// App.js is where we have access to the state

function App() {


  return (
    <div>
      <TopBar />
      <SideBar />
    </div>
  );
}

export default App;