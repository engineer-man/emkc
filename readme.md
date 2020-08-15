## Engineer Man Knowledge Center (emkc)
This is the official repo and project for the Engineer Man Knowledge Center. The official deployment of this project
is located at https://emkc.org. Be sure to familiarize yourself with the contribution guidelines and project license
if you plan to use this software.


#### Install Instructions
Docker is the preferred (and only supported) way to work with EMKC in development. EMKC is known to work on all
Linux/macOS machines and Windows machines running either WSL or natively with Windows 10 Pro.
- `git clone https://github.com/engineer-man/emkc`
- `cd emkc`
- `./emkc init`
- `./emkc start`

Once started, you can access the local version of the site at http://127.0.0.1:2005.


#### Local Config
There are two files needed to configure the application. Make sure to modify these with your own values. If
these files are not present, navigate to the project root and run `./emkc init`.
- App: `platform/config/local.js`
- DB Migrations: `platform/migrations/config.json`


#### Contribution Guidelines
All contributions are reviewed to make sure they work, fit well with the design, and fit well with
the established code. BDFL is [realtux](https://github.com/realtux) who will do a final review and merge
to master and deploy.
- Review the issues on GitHub and grab whichever you feel most comfortable doing
- Place code on a branch other than master/develop (Fork for non-org developers)
- Follow the style that is generally present with the project (details below)
- Use established tech in place (Bootstrap 4, React, etc.)
- Test to make sure everything works


#### General Code Guidelines
- Prefer spaces over tabs
- 120 character max line length for source
- PascalCase for classes, snake_case for everything else
- Use ES9 to the fullest extent possible
- Single quotes only
- In general just make code look like everything else


#### License
Engineer Man Knowledge Center is licensed under the permissive MIT license. License details can be found
in the `license` file in the root of the project.
