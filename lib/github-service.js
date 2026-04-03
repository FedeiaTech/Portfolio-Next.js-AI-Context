const GITHUB_USERNAME = "FedeiaTech"
const BASE_URL = "https://api.github.com"

export const getGitHubData = async () => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`),
      fetch(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
    ])

    if (!userRes.ok || !reposRes.ok) throw new Error("Error en API")

    const userData = await userRes.json()
    const reposData = await reposRes.json()

    const latestRepo = reposData[0]

    const commitRes = await fetch(
      `${BASE_URL}/repos/${GITHUB_USERNAME}/${latestRepo.name}/commits`
    )
    const commitData = await commitRes.json()
    const lastMessage = commitData[0]?.commit?.message || "Mejorando el sistema"

    const languagesMap = {}
    reposData.forEach((repo) => {
      if (repo.language)
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1
    })
    const topLanguages = Object.entries(languagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map((entry) => entry[0])

    return {
      stats: {
        repos: userData.public_repos,
        followers: userData.followers,
      },
      topLanguages,
      lastCommit: {
        repoName: latestRepo.name,
        stars: latestRepo.stargazers_count,
        message: lastMessage,
        url: latestRepo.html_url,
      },
    }
  } catch (error) {
    console.error("GitHub Error:", error)
    throw error
  }
}
