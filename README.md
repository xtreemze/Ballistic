# Ballistic

Ballistic is a first-person 3D physics shooter built with Babylon.js and designed to run directly in modern browsers on desktop and mobile.

Live site: https://xtreemze.github.io/Ballistic/

## Controls

### Desktop

- `W` / `A` / `S` / `D`: move
- Mouse: look around while Pointer Lock is active
- Left click: enter Pointer Lock, then fire
- `Esc`: release Pointer Lock

Desktop controls activate only when the browser reports a fine, hover-capable primary pointer. Existing touch controls remain unchanged on mobile.

### Mobile

The original touch controls remain active. Touch interaction is handled by the Babylon.js camera input already used by the game.

## Development

Requirements:

- Node.js 22.12 or newer
- npm
- A modern Chromium-based browser is recommended for desktop testing

Install tooling:

```sh
npm install
```

Start the local development server:

```sh
npm run dev
```

Then open:

```text
http://localhost:5173/Ballistic/
```

The Vite development server is used only for local serving and debugging. The game remains a static site and does not require a framework runtime.

## Validation and production build

Validate the deployable runtime:

```sh
npm run check
```

Build the exact GitHub Pages artifact:

```sh
npm run build
```

The production artifact is written to `dist/`. Only files required by the running game are copied, so source assets, Blender files, editor metadata, and development tooling are excluded from deployment.

Preview the production artifact:

```sh
npm run preview
```

## Deployment

GitHub Actions owns deployment.

Every push to `master` runs the Pages workflow, which:

1. installs the pinned development tooling,
2. validates the runtime,
3. creates `dist/`,
4. uploads only that artifact, and
5. deploys it through GitHub Pages.

The workflow can also be started manually from the Actions tab.

## Runtime structure

- `index.html` — canonical application entry point
- `js/master.js` — game initialization, physics, camera setup, and shooting
- `js/desktop-controls.js` — desktop-only WASD, Pointer Lock, and click-to-fire adapter
- `js/babylon.js` — legacy Babylon.js runtime used by the game
- `js/cannon.min.js` — physics runtime
- `js/ballistic.babylon` — scene
- `sw.js` — service worker
- `tools/build.mjs` — deterministic static production build
- `tools/check.mjs` — workspace/runtime validation

## Tooling

The original Webpack 3, Babel 6, Closure Compiler, AppCache, and offline-plugin build chain has been retired. It was no longer necessary for the deployed application and made fresh installs unreliable.

The workspace now uses Vite 8 for development serving and a small Node-based build step for the static production artifact. Vite 8 uses Rolldown rather than esbuild.

## License

See [LICENSE](LICENSE).
