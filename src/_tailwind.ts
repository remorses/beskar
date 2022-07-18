import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'

export function getConfig(tailwindConfig: any) {
    const fullConfig = resolveConfig(resolveConfig(tailwindConfig))
    return fullConfig
}
