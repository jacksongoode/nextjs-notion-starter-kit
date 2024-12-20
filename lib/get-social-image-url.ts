import { api } from './config'
import { getSiteUrl } from './get-config-value'

export function getSocialImageUrl(pageId: string) {
  try {
    const url = new URL(api.getSocialImage, getSiteUrl())

    if (pageId) {
      url.searchParams.set('id', pageId)
      return url.toString()
    }
  } catch (err) {
    console.warn('error invalid social image url', pageId, err.message)
  }

  return null
}
