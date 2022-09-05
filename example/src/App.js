import React from 'react'

import { AppVersionChecker } from '@bettercode/react-app-version-checker'
import '@bettercode/react-app-version-checker/dist/index.css'

const App = () => {
  const handleUpdate = () => {
    window.location.reload();
  }

  return <AppVersionChecker minuteInterval={1} versionApiEndPoint="http://localhost:3000/version.json">
    <div>
      Updated to new version. Click 'OK' to use the latest version.<button onClick={handleUpdate}>OK</button>
    </div>
  </AppVersionChecker>
}

export default App
