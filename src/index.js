import React, { useEffect, useState } from 'react'
import { VersionService } from './version.service'
import AppVersionStorage from './app.version.storage'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let intervalId = null

const NoticeNewVersion = styled.div`
  height: 30px;
  position: sticky;
  top: calc(30px - 5px * -1);
  display: flex;
  align-items: center;
  background-color: #ffc75f;
  z-index: 1;
`

const NoticeNewVersionInner = styled.div`
  height: 5px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.25;
  width: 90%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`

const CancelButton = styled.div`
  &:after {
    margin-left: 10px;
    display: inline-block;
    content: '\\00d7';
    cursor: pointer;
  }
`

const OkButton = styled.button`
  margin-left: 10px;
`

export const AppVersionChecker = ({
  message,
  okText,
  onOk,
  minuteInterval,
  versionApiEndPoint
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

  const handleCancel = () => {
    setShow(false)
  }

  const handleOk = () => {
    if (onOk) {
      onOk()
    } else {
      window.location.reload()
    }
  }

  return (
    show && (
      <NoticeNewVersion>
        <NoticeNewVersionInner>
          {message}
          <OkButton onClick={handleOk}>{okText || 'OK'}</OkButton>
          <CancelButton onClick={handleCancel} />
        </NoticeNewVersionInner>
      </NoticeNewVersion>
    )
  )
}

AppVersionChecker.propTypes = {
  message: PropTypes.string.isRequired,
  okText: PropTypes.string,
  onOk: PropTypes.func,
  minuteInterval: PropTypes.number.isRequired,
  versionApiEndPoint: PropTypes.string.isRequired
}
