## Engineer Man Knowledge Center (emkc)
This is the official repo and project for the Engineer Man Knowledge Center. The official deployment of this project
is located at https://emkc.org. Be sure to familiarize yourself with the contribution guidelines and project license
if you plan to use this software.


#### General Install Instructions
- Clone this repo
- Install Node.js 8.x.x https://nodejs.org/en/download/
- Install MySQL 8.0 https://dev.mysql.com/downloads/mysql/
- Install Redis https://redis.io/topics/quickstart
- Install bmig https://github.com/ebrian/bmig
- Create database "engineerman"
- Copy platform/config/local.js.sample -> platform/config/local.js and edit
- Copy platform/migrations/config.json.sample -> platform/migrations/config.json
- Copy platform/config/secrets/google_cloud.json.sample -> platform/config/secrets/google_cloud.json
- Run `npm install` in platform/
- RUn `bmig migrate` in platform/migrations
- Run `./start_dev --watch` in platform/


#### Asset Build Pipeline (platform/assets)
- css/src/\*\*/\*.less compiled to css/dist/master.css
- js/src/jsx/\*\*/\*.jsx compiled to js/dist/master_jsx.js
- js/src/js/\*\*/\*.js compiled to js/dist/master_js.js
- js/dist/\*.js combined and uglified to js/dist/master.js


#### Contribution Guidelines
All contributions are reviewed to make sure they work, fit well with the design, and fit well with
the established code. BDFL is [ebrian](https://github.com/ebrian) who will do a final review and merge
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
if you plan to modify this software in private and make it available to the public.
