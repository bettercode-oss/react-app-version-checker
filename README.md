# @bettercode/react-app-version-checker

> This module checks to update the code when the React App is redeployed.

## Install

```bash
# Using npm
npm install --save @bettercode/react-app-version-checker

# Using yarn
yarn add @bettercode/react-app-version-checker
```
## Precondition
You need a REST API to query the app version.
The Http response value should be as follows.
```json
{
 "version": 2
}
```

## Usage
```jsx
import React from 'react'

import { AppVersionChecker } from '@bettercode/react-app-version-checker'

const App = () => {
  return <AppVersionChecker
                message={'Updated to new version. Click \'OK\' to use the latest version.'}
                minuteInterval={1}
                versionApiEndPoint="http://localhost:3000/version.json"/>
}
```

![image](https://user-images.githubusercontent.com/16472109/188525610-b536d516-faa4-4a7e-8923-0196413e7707.png)

## Properties
| Property           | Description                           | Default Value            |
|--------------------|---------------------------------------|--------------------------|
| message            | The text of the message area          |                          |
| minuteInterval     | check cycle                           |                          |
| versionApiEndPoint | version checking REST API endpoint    |                          |
| onOk               | Set the handler to handle click event | window.location.reload() |
| okText             | The text of the Ok button             | Ok                       |
