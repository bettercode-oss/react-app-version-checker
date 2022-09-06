import React from 'react'

import { AppVersionChecker } from '@bettercode/react-app-version-checker'

const App = () => {
  return <AppVersionChecker message={'Updated to new version. Click \'OK\' to use the latest version.'}
                            minuteInterval={1} versionApiEndPoint="http://localhost:3000/version.json"/>
}

export default App
