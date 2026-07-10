import { useEffect, useState } from 'react'

const CACHE_TTL = 5 * 60 * 1000

function getCacheKey(username) {
  return `github_cache_${username}`
}

function readCache(username) {
  try {
    const raw = sessionStorage.getItem(getCacheKey(username))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(getCacheKey(username))
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(username, data) {
  try {
    sessionStorage.setItem(
      getCacheKey(username),
      JSON.stringify({ timestamp: Date.now(), data })
    )
  } catch {
    // Ignore storage quota errors
  }
}

async function parseErrorResponse(response) {
  if (response.status === 403) {
    return 'GitHub API rate limit exceeded. Please try again in a few minutes.'
  }
  if (response.status === 404) {
    return 'GitHub profile not found.'
  }
  try {
    const body = await response.json()
    return body.message || 'Failed to load GitHub data.'
  } catch {
    return 'Failed to load GitHub data.'
  }
}

export function useGitHub(username) {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchGitHubData() {
      const cached = readCache(username)
      if (cached) {
        setProfile(cached.profile)
        setRepos(cached.repos)
        setLoading(false)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`
          ),
        ])

        if (!profileRes.ok) {
          throw new Error(await parseErrorResponse(profileRes))
        }

        const profileData = await profileRes.json()
        let reposData = []

        if (reposRes.ok) {
          reposData = await reposRes.json()
        } else if (reposRes.status === 403) {
          throw new Error(await parseErrorResponse(reposRes))
        }

        const filteredRepos = reposData
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6)

        if (cancelled) return

        setProfile(profileData)
        setRepos(filteredRepos)
        writeCache(username, { profile: profileData, repos: filteredRepos })
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong while loading GitHub data.')
          setProfile(null)
          setRepos([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGitHubData()
    return () => {
      cancelled = true
    }
  }, [username])

  return { profile, repos, loading, error }
}
