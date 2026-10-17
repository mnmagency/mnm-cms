import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'mnm-cms',

  projectId: 'q7p7mofd',
  dataset: 'production',

  // media() adds a top-level "Media" tab next to Structure / Vision / Releases.
  // Browse every image + file uploaded to Sanity, tag/rename/replace them, and
  // reuse from any document without re-uploading.
  plugins: [structureTool(), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
