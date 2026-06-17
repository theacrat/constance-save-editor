# Constance Save Editor

Web UI for editing Constance save files.

Save data is located at `%UserProfile%\AppData\LocalLow\bluebackpack\CONSTANCE\Saves\Prod`. Retrieve the most recent `.save` file from the desired save slot.

## Setup

### Prerequisites

- [Bun](https://bun.sh/)

### Installation

```sh
# Install dependencies
bun install
```

### Development

```sh
# Start development server
bun dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

1. Create a Cloudflare account and login.

```sh
bun wrangler login
```

2. Deploy:

```sh
bun run build
bun wrangler deploy
```

## Licence

constance-save-editor

Copyright (C) 2026 thea

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

```
SPDX-License-Identifier: AGPL-3.0-or-later
```
