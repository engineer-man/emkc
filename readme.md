## Engineer Man Knowledge Center (emkc)
This is the official repo and project for the Engineer Man Knowledge Center. The official deployment of this project
is located at https://emkc.org. Be sure to familiarize yourself with the contribution guidelines and project license
if you plan to use this software.


#### Docker Install Instructions
- `git clone https://github.com/engineer-man/emkc`

- `cd emkc`

- `./emkc init`

- `./emkc start`

  You can access the local version of the site at http://127.0.0.1:2727/

#### Manual Install Instructions
- Install Node.js 8.x.x https://nodejs.org/en/download/
- Install MySQL 5.6 https://dev.mysql.com/downloads/mysql/
- Install Redis https://redis.io/topics/quickstart
- Install bmig https://github.com/ebrian/bmig
- Create database "emkc"
- `git clone https://github.com/engineer-man/emkc`
- `cd emkc`
- `./emkc init`
- `cd platform`
- `cp migrations/config.json.sample migrations/config.json`
- `npm install`
- `cd migrations`
- `bmig migrate`
- `cd ..`
- `./start_dev --watch`


#### Local Config
There are three files needed to configure the application. Make sure to modify these with your own values. If
these files are not present, navigate to the project root and run `./emkc init`.
- App: `platform/config/local.js`
- DB Migrations: `platform/migrations/config.json`
- Google Cloud: `platform/config/secrets/google_cloud.json`


#### Resource Build Pipeline
- resources/css/\*\*/\*.less compiled to public/css/master.css
- resources/js/jsx/\*\*/\*.jsx compiled to public/js/master_jsx.js
- resources/js/js/\*\*/\*.js compiled to public/js/master_js.js
- public/js/\*.js combined and uglified to public/js/master.js


#### Contribution Guidelines
All contributions are reviewed to make sure they work, fit well with the design, and fit well with
the established code. BDFL is [tipztek](https://github.com/tipztek) who will do a final review and merge
to master and deploy.
- Review the issues/board on GitHub and grab whichever you feel most comfortable doing
- Place code on a branch other than master/develop (Fork for non-org developers)
- Follow the style that is generally present with the project (details below)
- Use established tech in place (Bootstrap 4, React, etc.)
- Test to make sure everything works


#### General Code Guidelines
- Prefer spaces over tabs
- 120 character max line length for source
- PascalCase for classes, snake_case for everything else
- Use ES7 to the fullest extent possible
- Single quotes only
- In general just make code look like everything else


#### License
Engineer Man Knowledge Center is licensed under the AGPLv3. You have specific obligations under this license
if you plan to modify this software in private and make it available to the public. Specifically, you must
make your copy open source along with your modifications. License details can be found in the `license` file
in the root of the project.
