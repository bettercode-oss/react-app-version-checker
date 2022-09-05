import React, { useEffect, useState } from 'react'
import { VersionService } from './version.service'
import AppVersionStorage from './app.version.storage'
import PropTypes from 'prop-types'

let intervalId = null

const AppVersionChecker = ({
  minuteInterval,
  versionApiEndPoint,
  children
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    VersionService.getAppVersion(versionApiEndPoint)
      .then((response) => response.json())
      .then((result) => {
        AppVersionStorage.setAppVersion(result.version)
      })
      .catch((error) => {
        console.error('app version checker - get version error:', error)
      })

    intervalId = setInterval(() => {
      VersionService.getAppVersion(versionApiEndPoint)
        .then((response) => response.json())
        .then((result) => {
          if (AppVersionStorage.equalVersion(result.version) === false) {
            setShow(true)
          }
        })
        .catch((error) => {
          console.error('app version checker - get version error:', error)
        })
    }, minuteInterval * 60 * 1000)

    return function cleanup() {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }, [])

  return show && children
}

AppVersionChecker.propTypes = {
  minuteInterval: PropTypes.number.isRequired,
  versionApiEndPoint: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default AppVersionChecker
