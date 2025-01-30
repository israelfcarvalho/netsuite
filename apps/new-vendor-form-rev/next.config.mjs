const buildForNetsuite = false

console.log('on config', process.env.NODE_ENV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: 'export',
  webpack(config){
    
    if(buildForNetsuite){
      config.output.publicPath = '/app/site/hosting/scriptlet.nl?script=customscript_sp_st_external_framework_ui&deploy=customdeploy_sp_st_external_framework_ui&resource=/_next/'
    }

    return config
  }
}

export default nextConfig
