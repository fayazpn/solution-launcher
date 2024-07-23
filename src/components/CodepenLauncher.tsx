import React from 'react';

const dummyRepos = [
  {
    username: 'fayazpn',
    repo: 'cr-exchange',
    type: 'frontend',
  },
  {
    username: 'fayazpn',
    repo: 'label-thumbs',
    type: 'full-stack',
  },
  {
    username: 'fayazpn',
    repo: 'nest',
    type: 'backend',
  },
];

export const CodepenLauncher: React.FC<any> = () => {
  const openCodeSandbox = (username: string, repository: string) => {
    const url = `https://codesandbox.io/s/github/${username}/${repository}`;
    window.open(url, '_blank');
  };

  const openGitpod = (username: string, repository: string) => {
    const url = `https://gitpod.io/#github.com/${username}/${repository}`;
    window.open(url, '_blank');
  };
  return (
    <>
      <div className="min-h-[100vh] flex justify-center items-center flex-col">
        <h1>Code Sandbox</h1>
        <div className="flex justify-center items-center gap-5">
          {dummyRepos.map((repo) => (
            <button
              className={`p-2 mb-2
              text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 border-l-2 bg-white border-pink-500 dark:border-l-2 dark:bg-gray-900 dark:border-pink-400`}
              onClick={() =>
                openCodeSandbox(repo.username, repo.repo)
              }
            >
              Launch {repo.type} solution
            </button>
          ))}
        </div>

        <h1>Gitpod</h1>
        <div className="flex justify-center items-center gap-5">
          {dummyRepos.map((repo) => (
            <button
              className={`p-2 mb-2
              text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 border-l-2 bg-white border-pink-500 dark:border-l-2 dark:bg-gray-900 dark:border-pink-400`}
              onClick={() => openGitpod(repo.username, repo.repo)}
            >
              Launch {repo.type} solution
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
