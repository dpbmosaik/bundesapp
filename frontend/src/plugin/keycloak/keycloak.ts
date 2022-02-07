import Keycloak from 'keycloak-js'
import { isNil } from './utils'
import store from '../../store'

type KeycloakInstance = Keycloak.KeycloakInstance | undefined

let $keycloak: KeycloakInstance

export async function isTokenReady (): Promise<void> {
  return new Promise(resolve => checkToken(resolve))
}

const checkToken = (resolve: () => void) => {
  if (!isNil($keycloak) && !isNil($keycloak.token)) {
    resolve()
  } else {
    setTimeout(() => checkToken(resolve), 500)
  }
}

export function getKeycloak (): Keycloak.KeycloakInstance {
  return $keycloak as Keycloak.KeycloakInstance
}

export async function getToken (): Promise<string> {
  return updateToken()
}

export async function updateToken (): Promise<string> {
  if (!$keycloak) {
    throw new Error('Keycloak is not initialized.')
  }

  try {
    await $keycloak.updateToken(10)
    store.commit('setToken', $keycloak.token as string)
  } catch (error) {
    store.commit('setIsAuthFailed', true)
    store.commit('clearToken')
    store.commit('clearUserinfo')
    store.commit('setIsAuth', false)
    throw new Error('Failed to refresh the token, or the session has expired')
  }
  return $keycloak.token
}

export function createKeycloak (config: Keycloak.KeycloakConfig | string): Keycloak.KeycloakInstance {
  $keycloak = Keycloak(config)
  return getKeycloak()
}

export async function initKeycloak (initConfig: Keycloak.KeycloakInitOptions): Promise<void> {
  try {
    store.commit('setIsAuthPending', true)
    const _isAuthenticated = await $keycloak.init(initConfig)
    store.commit('setIsAuth', _isAuthenticated)

    const userInfo = await $keycloak.loadUserInfo()
    console.log('userInfo')
    console.log(userInfo)
    store.commit('setUserinfo', userInfo)

    console.log('Init Keycloak with Auth=' + store.getters.isAuth)
    if (!isNil($keycloak.token)) {
      store.commit('setToken', $keycloak.token as string)
    }

    $keycloak.onAuthRefreshSuccess = function () {
      console.log('Keycloak did refresh the token')
      store.commit('setToken', $keycloak.token as string)
    }
    $keycloak.onTokenExpired = () => updateToken()
  } catch (error) {
    store.commit('setIsAuthFailed', true)
    store.commit('setIsAuth', false)
    console.log('Init Keycloak with: Cant get access token (is the user logged in?)')
  } finally {
    store.commit('setIsAuthPending', false)
  }
}
