class VersionService {
  getAppVersion(versionApiEndPoint) {
    // eslint-disable-next-line no-undef
    return fetch(versionApiEndPoint)
  }
}

const instance = new VersionService()
export { instance as VersionService }
