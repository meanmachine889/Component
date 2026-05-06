import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

const registry = JSON.parse(readFileSync(resolve(root, "registry.json"), "utf8"))

mkdirSync(resolve(root, "public/r"), { recursive: true })

for (const item of registry.items) {
  const files = item.files.map((file) => ({
    ...file,
    content: readFileSync(resolve(root, file.path), "utf8"),
  }))

  const out = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: files.map((f) => ({
      path: f.target ?? f.path,
      content: f.content,
      type: f.type,
      target: f.target,
    })),
    cssVars: item.cssVars ?? {},
  }

  const outPath = resolve(root, `public/r/${item.name}.json`)
  writeFileSync(outPath, JSON.stringify(out, null, 2))
  console.log(`wrote ${outPath} (${statSync(outPath).size} bytes)`)
}
